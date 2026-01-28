'''
Thirstie Access Apostrophe / Lightsail Management
-------------------------------------------------

Services used:
- AWS Lightsail
- AWS Systems Manager Parameter Store
- AWS CodeDeploy
- Mongodb/Atlas API: https://www.mongodb.com/docs/api/doc/atlas-admin-api-v2/
  - api keys: Organization/Project -> Project Identity & Access -> Applications -> API Keys
    - TODO: at some point change to service accounts
  - ip whitelist: Organization/Project -> Database & Network Access -> IP Access List

'''
import json
import logging
import time
from urllib.parse import urljoin

import boto3
import requests

from jinja2 import Template, Environment, FileSystemLoader, select_autoescape
from requests.auth import HTTPDigestAuth


MAX_PAGES = 10
DEFAULT_BASE_URL_FOR_ENVIRONMENT = {
    'dev': 'getthirstie.com',
    'sandbox': 'getthirstie.com',
    'prod': 'access.thirstie.com'
}

# Lightsail configuration
# - ELB has it's own hosted zone
AWS_REGION = 'us-east-2'
AWS_LIGHTSAIL_ELB_HOSTED_ZONE = 'Z3AADJGX6KTTL2'
DEFAULT_AV_ZONE = 'us-east-2a'
DEFAULT_BLUEPRINT_ID = 'ubuntu_24_04'
DEFAULT_BUNDLE_ID = 'small_3_0'

APOS_MONGODB_CONN_STRING_TPL = 'mongodb+srv://{{APOS_MONGODB_USER}}:{{APOS_MONGODB_SECRET}}@{{APOS_MONGODB_DOMAIN}}/{{APPLICATION_NAME}}?appName={{APOS_MONGODB_CLUSTER}}&retryWrites=true&w=majority'
APOS_LS_LAUNCH_SCRIPT_TPLNAME = 'lightsail_install.sh.jinja'

SSM_BASE_CONFIG_KEY = '/access_sdk_apos/lightsail_codedeploy_base_config'


def get_logger(name=None, level='info'):
    logging_level = {
        "info": logging.INFO,
        "debug": logging.DEBUG
    }.get(level.lower(), logging.DEBUG)
    name = name or 'devtools_debugging'
    FORMAT = '%(asctime)-15s %(name)s %(filename)s:%(lineno)d - %(levelname)s - %(message)s'
    logging.basicConfig(format=FORMAT, level=logging_level)
    logger = logging.getLogger(name)
    return logger


def create_site_config(application_name, instance_name, brand_urn, site_api_key, site_maps_key, th_environment='sandbox', ssm_key=SSM_BASE_CONFIG_KEY):

    ssm_client = boto3.client('ssm', region_name=AWS_REGION)
    params = ssm_client.get_parameter(Name=ssm_key, WithDecryption=True).get('Parameter', {}).get('Value')
    base_config = json.loads(params)
    HOSTED_ZONES= base_config.get('HOSTED_ZONES')
 
    base_url = DEFAULT_BASE_URL_FOR_ENVIRONMENT.get(th_environment, DEFAULT_BASE_URL_FOR_ENVIRONMENT['sandbox'])
    site_hosted_zone = HOSTED_ZONES.get(base_url)
    apos_mongodb_conn_str = Template(APOS_MONGODB_CONN_STRING_TPL).render(
        APPLICATION_NAME=application_name,
        APOS_MONGODB_USER=base_config.get('APOS_MONGODB_USER'),
        APOS_MONGODB_SECRET=base_config.get('APOS_MONGODB_SECRET'),
        APOS_MONGODB_DOMAIN=base_config.get('APOS_MONGODB_DOMAIN'),
        APOS_MONGODB_CLUSTER=base_config.get('APOS_MONGODB_CLUSTER')
    )

    site_config = {
        'application_name': application_name,
        'instance_name': instance_name,
        'brand_urn': brand_urn,
        'site_api_key': site_api_key,
        'site_maps_key': site_maps_key,
        'th_environment': th_environment,
        'base_url': base_url,
        'site_server_name': f'{brand_urn}.{base_url}',
        'site_environment': th_environment,
        'site_hosted_zone': site_hosted_zone,
        'APOS_REPO_URL': f'https://github.com/ThirstieAdmin/{base_config.get("APOS_REPO_NAME")}.git',
        'APOS_MONGODB_URI': apos_mongodb_conn_str,
        'APOS_MONGO_ATLAS_GROUPID': base_config.get('APOS_MONGO_ATLAS_GROUPID')
    }
    site_config.update(base_config)

    return site_config


def create_launch_script(site_config, template_name=APOS_LS_LAUNCH_SCRIPT_TPLNAME):
    """
    Creates a launch script for a Lightsail instance based on the provided site configuration.

    Args:
        site_config (dict): The site configuration dictionary.
        template_name (str): The name of the Jinja2 template to use.

    Returns:
        str: The rendered launch script.
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    templates_path = os.path.join(script_dir, 'templates')

    env = Environment(loader=FileSystemLoader(templates_path), autoescape=select_autoescape(['html', 'xml']))
    template = env.get_template(template_name)
    return template.render(**site_config)


class LightsailClient:
    """
    A client for managing AWS Lightsail instances with integrated Route 53 DNS and TLS support.

    This client simplifies deploying web applications to Lightsail by handling instance creation,
    load balancer setup, TLS certificate provisioning, and DNS configuration.

    Basic usage:
        client = LightsailClient('my-app', brand_urn='mybrand', site_api_key='...', site_maps_key='...',region='us-east-2', environment='test')

        # Create an instance with a launch script
        client.create_instance()

        # Set up load balancer with TLS and DNS
        client.setup_lb_tls_for_instance()

        # Delete instance and clean up resources
        client.delete_instance(with_all_resources=True)

        # List existing instances
        instances = client.get_instances(service_tag='thirstieaccess')
    """

    def __init__(self, application_name, brand_urn, site_api_key, site_maps_key, environment='sandbox',region=AWS_REGION):
        self.region_name = region
        self.lightsail = boto3.client('lightsail', region_name=self.region_name)
        self.route53 = boto3.client('route53')

        self.logger = get_logger('LightsailClient')

        self.application_name = application_name
        self.environment = environment
        self.instance_name = f"{application_name}-{environment}"

        self.site_config = create_site_config(self.application_name, self.instance_name, brand_urn, site_api_key, site_maps_key, th_environment=environment)
        self.resource_names = self.configure_resource_names()

        self.logger.info(f"Initialized LightsailClient for instance: {self.instance_name}, environment: {self.environment}")

    @property
    def launch_script(self):
        return create_launch_script(self.site_config)

    def mongodb_admin_api(self, action, method='GET', **kwargs):
        """
        Call the MongoDB admin API with the given action and parameters.

        Args:
            action (str): The MongoDB admin API action to call.
            **kwargs: Additional keyword arguments to pass to the API.

        Returns:
            dict: The response from the MongoDB admin API.
        """
        request_method = dict(GET=requests.get, POST=requests.post, PUT=requests.put, DELETE=requests.delete).get(method.upper())
        if not request_method:
            self.logger.error(f"Invalid HTTP method: {method}")
            return {"error": f"Invalid HTTP method: {method}"}

        APOS_MONGO_ATLAS_GROUPID = self.site_config.get('APOS_MONGO_ATLAS_GROUPID')

        mongodb_url = f'https://cloud.mongodb.com/api/atlas/v2/groups/{APOS_MONGO_ATLAS_GROUPID}/'
        headers = {
            'Accept': 'application/vnd.atlas.2025-03-12+json',
            'Content-Type': 'application/json'
        }
        auth = HTTPDigestAuth(self.site_config.get('APOS_MONGO_ADMIN_API_KEY'), self.site_config.get('APOS_MONGO_ADMIN_API_SECRET'))

        response = request_method(urljoin(mongodb_url, action), auth=auth, headers=headers, **kwargs)
        
        if response.status_code in (200, 201):
            self.logger.info(f"Successfully called MongoDB admin API for action: {action}, response status: {response.status_code}")
            return response.json()
        elif response.status_code in (202, 204):
            self.logger.warning(f"Successfully called MongoDB admin API for action: {action}, response status: {response.status_code}")
            return {}
        else:
            self.logger.error(f"Failed to call MongoDB admin API: {response.status_code}")
            return {"error": f"Failed to call MongoDB admin API: {response.status_code}"}

    def get_mongodb_ip_list(self):
        ip_list = []
        response = self.mongodb_admin_api('accessList')
        if 'error' not in response:
            ip_list = [ip for ip in response.get('results', [])]
        return ip_list

    def check_mongodb_access_list(self, ip_address):
        ip_list = self.get_mongodb_ip_list()
        return ip_address in [ip['cidrBlock'].split('/')[0] for ip in ip_list]

    def add_ip_to_mongodb_access_list(self, ip_address, type='static'):

        if not self.check_mongodb_access_list(ip_address):
            APOS_REPO_NAME = self.site_config.get('APOS_REPO_NAME')
            data = [{"comment": f"{APOS_REPO_NAME}-{self.instance_name}-{type}","cidrBlock":f"{ip_address}/32"}]

            self.logger.info(f"Adding IP address {ip_address} to MongoDB access list")
            self.logger.info(f"{APOS_REPO_NAME}-{self.instance_name}")
            self.logger.info(f"cidrBlock: {ip_address}/32")
    
            response = self.mongodb_admin_api('accessList', method='POST', data=json.dumps(data))
            self.logger.info(f"Response from MongoDB admin API: {response}")
            if 'error' not in response:
                self.logger.info(f"Successfully added IP address {ip_address} to MongoDB access list")
            else:
                self.logger.error(f"Failed to add IP address {ip_address} to MongoDB access list: {response}")
        
        return self.get_mongodb_ip_list()
    
    def remove_ip_from_mongodb_access_list(self, ip_address):

        if self.check_mongodb_access_list(ip_address):

            response = self.mongodb_admin_api(f'accessList/{ip_address}', method='DELETE')
            if 'error' not in response:
                self.logger.info(f"Successfully removed IP address {ip_address} from MongoDB access list")
            else:
                self.logger.error(f"Failed to remove IP address {ip_address} from MongoDB access list: {response}")
        
        return self.get_mongodb_ip_list()

    def configure_resource_names(self):

        environment = getattr(self, 'environment', 'sandbox')
        application_name = self.site_config.get('application_name')
        instance_name = self.site_config.get('instance_name')
        host_name = self.site_config.get('base_url', DEFAULT_BASE_URL_FOR_ENVIRONMENT.get(environment))
        brand_urn = self.site_config.get('brand_urn')
        hosted_zone_id = self.site_config['site_hosted_zone']
        site_server_name = self.site_config['site_server_name']

        sld, tld = site_server_name.rsplit('.', 1)
        sld = sld.replace('.', '-')

        cfg = dict(
            application_name=application_name,
            instance_name=instance_name,
            host_name=host_name,
            site_domain_name=site_server_name,
            static_ip_name=f'{instance_name}-static-ip',
            certificate_name=f'{sld}-{tld}-lbcert',
            load_balancer_name=f'{sld}-{tld}-lb',
            hosted_zone_id=hosted_zone_id
        )

        return cfg

    def get_bundles(self, bundle_type='LINUX_UNIX'):
        bundles = self.lightsail.get_bundles().get('bundles')
        allowable_bundles = list(filter(lambda r: r.get('ramSizeInGb', 0) >= 2 and r.get('ramSizeInGb', 0) <= 4 and bundle_type in r.get('supportedPlatforms', []), bundles))

        return allowable_bundles

    def get_blueprints(self):

        def filter_blueprints(record):
            matches = False
            platform = record.get('platform') == 'LINUX_UNIX'
            bp_type = record.get('type') == 'os'

            return platform and bp_type


        response = self.lightsail.get_blueprints(
            includeInactive=False
        )
        page_token = response.get('nextPageToken')
        blueprints = response.get('blueprints')

        page_count = 0
        while page_count < MAX_PAGES and page_token is not None:
            response = self.lightsail.get_blueprints(
                includeInactive=False
            )
            page_token = response.get('nextPageToken')
            blueprints.extend(response.get('blueprints', []))
        
        return blueprints

    def get_instances(self, service_tag=None):
        '''
        Retrieve list of lightsail instances
        '''

        def filter_by_service(record):
            matches = False
            if not service_tag:
                return True

            it = filter(
                lambda rec: rec.get('key') == 'service' and rec.get('value') == service_tag,
                record.get('tags', [])
            )
            matching_tags = next(it, [])
            matches = len(matching_tags) > 0

            return matches

        results = self.lightsail.get_instances()
        instances = results.get('instances', [])
        page_token = results.get('nextPageToken')

        page_count = 0
        while page_token is not None and page_count < MAX_PAGES:
            page_count += 1
            results = self.lightsail.get_instances(pageToken=page_token)
            page_token = results.get('nextPageToken')
            instances.extend(results.get('instances', []))
        
        filtered_instances = list(filter(filter_by_service, instances)) if service_tag else instances

        return filtered_instances

    # create_instance methods
    #########################

    def create_instance(self):
        '''
        Create and provision a new lightsail instance

        TO INSPECT, CONNECT TO INSTANCE
        # inspect logs with `less -F /var/log/cloud-init-output.log`
        # sudo su - nodeapps
        # pm2 list
        # journalctl -xeu nginx.service
        # systemctl status nginx.service
        '''

        instance_name = self.instance_name
        self.logger.info(f"Creating instance: {instance_name}")

        launch_script = self.launch_script

        instance_kwargs = dict(
            instanceNames=[ instance_name, ],
            availabilityZone=self.site_config.get('DEFAULT_AV_ZONE'),
            blueprintId=self.site_config.get('DEFAULT_BLUEPRINT_ID'),
            bundleId=self.site_config.get('DEFAULT_BUNDLE_ID'),
            userData=launch_script,
            keyPairName=self.site_config.get('DEFAULT_LS_KEYPAIR_NAME'),
            tags=[
                {'key': 'service', 'value': 'thirstieaccess'},
                {'key': 'environment', 'value': self.environment}
            ],
            ipAddressType='dualstack'  # |'ipv4'|'ipv6'
        )
        # 1. create
        create_res = self.lightsail.create_instances(**instance_kwargs)

        # 2. wait until instance is running
        instance_state = ''
        num_attempts = 0
        while instance_state != 'running' and num_attempts < MAX_PAGES:
            time.sleep(1)
            status_response = self.lightsail.get_instance_state(instanceName=instance_name)
            instance_state = status_response.get('state', {}).get('name', '')

        # 3. close port 22, only allow ssh access via lightsail consle
        if instance_state == 'running':
            logging.info('Restricting instance port 22 to lightsail console only')
            self.close_instance_ports(instance_name)

        # 4. ensure static_ip is allocated and attached
        self.allocate_attach_static_ip_to_instance()

        # 5.update mongodb access list
        instance_ip = self.get_instance_ip(instance_name)
        self.add_ip_to_mongodb_access_list(instance_ip['public_ip'])

        return create_res, instance_state

    def close_instance_ports(self, instance_name=None):

        instance_name = instance_name or self.instance_name
    
        # NOTE: create_instances has to complete first
        # open only port 80 for HTTP, and port 22 for access via lightsail-connect (no public access)
        ports = [
            {'fromPort': 22, 'toPort': 22, 'protocol': 'tcp', 'cidrs': [], 'cidrListAliases': ['lightsail-connect']},
            {'fromPort': 80, 'toPort': 80, 'protocol': 'tcp'}
        ]

        res = self.lightsail.put_instance_public_ports(portInfos=ports, instanceName=instance_name)

        return res

    def get_instance_ip(self, instance_name=None):
        instance_name = instance_name or self.instance_name

        response = self.lightsail.get_instance(instanceName=instance_name)

        static_ip_name = ''
        if response.get('instance', {}).get('isStaticIp', False):
            static_ips_response = self.lightsail.get_static_ips()
            ip_list = static_ips_response.get('staticIps', [])
            for ip in ip_list:
                if ip.get('isAttached', False) and ip.get('attachedTo') == instance_name:
                    static_ip_name = ip.get('name')
                    break

        result = {
            'private_ip': response.get('instance', {}).get('privateIpAddress'),
            'public_ip': response.get('instance', {}).get('publicIpAddress'),
            'is_static': response.get('instance', {}).get('isStaticIp', False),
            'static_ip_name': static_ip_name
        }
        return result

    def check_instance_static_ip(self, instance_name=None, static_ip_name=None):
        instance_name = instance_name or self.instance_name
        static_ip_name = static_ip_name or self.resource_names.get('static_ip_name')

        try:
            static_ip = self.lightsail.get_static_ip(staticIpName=static_ip_name)
        except Exception as e:
            self.logger.error(f"Error retrieving static IP {static_ip_name}: {e}")
            return {}

        result = {
            'is_attached': static_ip.get('staticIp', {}).get('isAttached', False),
            'attached_instance': static_ip.get('staticIp', {}).get('attachedTo', None),
            'ip_address': static_ip.get('staticIp', {}).get('ipAddress', None),
            'instance_name': instance_name,
            'static_ip_name': static_ip_name,
            'static_ip': static_ip
        }
        return result

    def allocate_attach_static_ip_to_instance(self, instance_name=None, static_ip_name=None):

        instance_static_ip = self.check_instance_static_ip()

        if not instance_static_ip.get('is_attached'):

            instance_name = instance_name or self.instance_name
            static_ip_name = static_ip_name or self.resource_names.get('static_ip_name')

            # 1. allocate static IP
            self.lightsail.allocate_static_ip(staticIpName=static_ip_name)

            # 2. attach static IP to instance
            self.lightsail.attach_static_ip(staticIpName=static_ip_name, instanceName=instance_name)

            instance_static_ip = self.check_instance_static_ip()

        return instance_static_ip

    # load balancer and certificate management
    ##########################################

    def create_load_balancer(self, resource_names=None):
        if not resource_names:
            resource_names = self.resource_names

        load_balancer_name = resource_names['load_balancer_name']
        site_domain_name = resource_names['site_domain_name']
        certificate_name = resource_names['certificate_name']

        # 1) check for existing
        try:
            lb_details = self.lightsail.get_load_balancer(loadBalancerName=load_balancer_name)
        except Exception:
            lb_details = None

        if not lb_details:
            # 2) otherwise, create it
            self.logger.info(f"Creating load balancer {load_balancer_name}")
            try:
                lb_response = self.lightsail.create_load_balancer(
                    loadBalancerName=load_balancer_name,
                    instancePort=80,
                    certificateName=certificate_name,
                    certificateDomainName=site_domain_name,
                    ipAddressType='dualstack',
                    tags=[
                        {'key': 'service', 'value': 'thirstieaccess'},
                        {'key': 'environment', 'value': self.environment}
                    ]
                )
            except Exception as e:
                self.logger.error(f"Error creating load balancer {load_balancer_name}: {e}")
                raise

            lb_details = self.lightsail.get_load_balancer(
                loadBalancerName=load_balancer_name
            )
        else:
            self.logger.info(f"Load balancer {load_balancer_name} already exists.")

        return lb_details

    def attach_load_balancer(self, resource_names=None):

        if not resource_names:
            resource_names = self.configure_resource_names()

        instance_name = resource_names['instance_name']
        load_balancer_name = resource_names['load_balancer_name']
         # 1) check for existing
        try:
            lb_details = self.create_load_balancer(resource_names=resource_names)
        except Exception:
            lb_details = None
            return lb_details

        if not lb_details:
            self.logger.info(f"Load balancer {load_balancer_name} exists.")
            assert False, f"Load balancer {load_balancer_name} does not exist."

        assert instance_name == self.instance_name and load_balancer_name == resource_names['load_balancer_name']

        # 1. Attach your Lightsail instance to the load balancer
        self.lightsail.attach_instances_to_load_balancer(
            loadBalancerName=load_balancer_name,
            instanceNames=[instance_name, ]  # Replace with your instance name
        )
        
        # 2. Get load balancer DNS name for Route 53 record
        lb_details = self.lightsail.get_load_balancer(
            loadBalancerName=load_balancer_name
        )

        return lb_details

    def check_route53_record_set(self, hosted_zone_id, record_type, record_name):

        response = self.route53.list_resource_record_sets(
            HostedZoneId=hosted_zone_id,
            StartRecordType=record_type,
            StartRecordName=record_name
        )

        results = [
            record_set for record_set in response.get('ResourceRecordSets', [])
            if record_set.get('Name') == record_name and record_set.get('Type') == record_type
        ]
        return results

    def validate_and_attach_certificate(self, resource_names=None):

        if not resource_names:
            resource_names = self.resource_names

        hosted_zone_id = resource_names['hosted_zone_id']
        load_balancer_name = resource_names['load_balancer_name']

        # 1. Get certificate validation records
        try:
            cert_details_response = self.lightsail.get_load_balancer_tls_certificates(
                loadBalancerName=load_balancer_name
            )
        except Exception as e:
            self.logger.error(f"Error getting load balancer TLS certificates: {e}")
            raise e

        cert_details = cert_details_response['tlsCertificates'][0]
        certificate_name = cert_details['name']
        status = cert_details['status']
        is_attached = cert_details['isAttached']

        # 2. Add DNS validation record to Route 53
        if status != 'ISSUED':
            validation_record = cert_details['domainValidationRecords'][0]

            self.logger.info(f"Creating Route53 record set for certificate {certificate_name} in hosted zone {hosted_zone_id}")
            self.logger.info(f"validation record: {validation_record}")

            if self.check_route53_record_set(hosted_zone_id, validation_record['type'], validation_record['name']):
                self.logger.info(f"Route53 {validation_record['type']} record set already exists for certificate {certificate_name}")
            else:
                try:
                    self.route53.change_resource_record_sets(
                        HostedZoneId=hosted_zone_id,
                        ChangeBatch={
                        'Changes': [{
                            'Action': 'CREATE',
                                'ResourceRecordSet': {
                                    'Name': validation_record['name'],
                                    'Type': validation_record['type'],
                                    'TTL': 300,
                                    'ResourceRecords': [{'Value': validation_record['value']}]
                                }
                            }]
                        }
                    )
                except Exception as e:
                    self.logger.error(f"error creating route53 record set: {e}")
                    raise e

            self.logger.info(f"Created Route53 record set for certificate {certificate_name}")

            # 3. Wait for certificate validation
            self.logger.info(f"Waiting for certificate validation {certificate_name}...")
            status = ''
            num_tries = 0
            while num_tries < 30 and status != 'ISSUED':
                cert_details_response = self.lightsail.get_load_balancer_tls_certificates(
                    loadBalancerName=load_balancer_name
                )
                cert_details = cert_details_response['tlsCertificates'][0]
                status = cert_details['status']
                is_attached = cert_details['isAttached']
                
                if status == 'ISSUED':
                    break
                elif status == 'FAILED':
                    raise Exception("Certificate validation failed")
                
                time.sleep(30)
                num_tries += 1

        if status != 'ISSUED':
            raise Exception("Certificate validation failed")

        self.logger.info(f"Certificate validated: {certificate_name}")
        
        if not is_attached:
            self.logger.info(f"Attaching certificate {certificate_name} to load balancer {load_balancer_name}")
            cert_details = self.attach_cert_to_load_balancer(load_balancer_name, certificate_name)

        cert_details_response = self.lightsail.get_load_balancer_tls_certificates(
            loadBalancerName=load_balancer_name
        )
        cert_details = cert_details_response['tlsCertificates'][0]
        status = cert_details['status']
        is_attached = cert_details['isAttached']

        return {'certificate_name': certificate_name, 'status': status, 'cert_details': cert_details, 'is_attached': is_attached}

    def attach_cert_to_load_balancer(self, load_balancer_name, certificate_name):

        lb_attached = self.lightsail.attach_load_balancer_tls_certificate(
            loadBalancerName=load_balancer_name,
            certificateName=certificate_name
        )
        cert_details_response = self.lightsail.get_load_balancer_tls_certificates(
            loadBalancerName=load_balancer_name
        )
        cert_details = cert_details_response['tlsCertificates'][0]

        return cert_details

    def create_route53_a_record(self, resource_names=None):

        if not resource_names:
            resource_names = self.configure_resource_names()

        site_domain_name = resource_names.get('site_domain_name')
        hosted_zone_id = resource_names.get('hosted_zone_id')
        load_balancer_name = resource_names.get('load_balancer_name')

        # 1) check that load balancer exists
        try:
            lb_details = self.lightsail.get_load_balancer(loadBalancerName=load_balancer_name)
        except Exception:
            self.logger.info(f"Load balancer {load_balancer_name} does not exist")
            raise

        load_balancer_dns_name = lb_details['loadBalancer']['dnsName']

        # ELB hosted zone for us-east-2
        lightsail_elb_hosted_zone = 'Z3AADJGX6KTTL2'

        # Create Route 53 A record pointing to load balancer
        if self.check_route53_record_set(hosted_zone_id, 'A', site_domain_name):
            self.logger.info(f"Route53 A record already exists for domain {site_domain_name}")
        else:
            r53_response = self.route53.change_resource_record_sets(
                HostedZoneId=hosted_zone_id,
                ChangeBatch={
                    'Changes': [{
                        'Action': 'CREATE',
                        'ResourceRecordSet': {
                            'Name': site_domain_name,
                            'Type': 'A',
                            'AliasTarget': {
                                'DNSName': load_balancer_dns_name,
                                'EvaluateTargetHealth': False,
                                'HostedZoneId': lightsail_elb_hosted_zone
                            }
                        }
                    }]
                }
            )

        return r53_response

    def set_lb_http_redirect(self, load_balancer_name):
        response = self.lightsail.update_load_balancer_attribute(
            loadBalancerName=load_balancer_name,
            attributeName='HttpsRedirectionEnabled',
            attributeValue='true'
        )
        return response

    def setup_lb_tls_for_instance(self, resource_names=None):

        resource_names = resource_names or self.resource_names

        site_domain_name = resource_names.get('site_domain_name')
        load_balancer_name = resource_names.get('load_balancer_name')
        certificate_name = resource_names.get('certificate_name')
        hosted_zone_id = resource_names.get('hosted_zone_id')

        # 1. Load Balancer with TLS Cert
        self.logger.info(f"1. Setting up TLS for load balancer {load_balancer_name}")
        lb_response = self.create_load_balancer(resource_names)
        
        # 2. Attach to instance
        self.logger.info(f"2. Attaching load balancer {load_balancer_name} to instance {self.instance_name}")
        lb_details = self.attach_load_balancer(resource_names=resource_names)

        # 3. Create Route 53 A record pointing to load balancer
        self.logger.info(f"3. Creating Route 53 A record for load balancer {load_balancer_name}")
        r53 = self.create_route53_a_record(resource_names=resource_names)

        # 4. Validate certificate and then attach to load balancer
        self.logger.info(f"4. Validating and attaching certificate {certificate_name} to load balancer {load_balancer_name}")
        time.sleep(10)  # make sure load balancer updates have completed
        cert_details = self.validate_and_attach_certificate(resource_names=resource_names)

        #5. update-load-balancer-attribute HttpsRedirectionEnabled true
        self.set_lb_http_redirect(load_balancer_name)

        return {'lb_details': lb_details, 'cert_details': cert_details, 'route53': r53}

    # instance management / delete_instance methods
    ###############################################

    def get_load_balancer_for_instance(self, instance_name=None):
        instance_name = instance_name or self.instance_name

        load_balancers = self.lightsail.get_load_balancers()['loadBalancers']

        for lb in load_balancers:
            attached_instances = [
                inst['instanceName'] for inst in lb.get('instanceHealthSummary', [])
                if instance_name == inst['instanceName']
            ]

            # this client assumes that each load balancer has a single instance attached
            if attached_instances:
                assert len(attached_instances) == 1, 'multiple instances attached to instance load balancer'
                return lb
        
        return None

    def get_resource_names(self, instance_name):

        lb = self.get_load_balancer_for_instance(instance_name)
        if not lb:
            return {}

        ip_details = self.get_instance_ip(instance_name)
        public_ip = ip_details['public_ip']
        static_ip_address = public_ip if ip_details.get('is_static') else None
        static_ip_name = ip_details['static_ip_name']

        load_balancer_name = lb['name']
        load_balancer_dns_name = lb['dnsName']

        cert_details = self.lightsail.get_load_balancer_tls_certificates(loadBalancerName=load_balancer_name)
        self.logger.info(f'Count of certificates attached to load balancer = {len(cert_details["tlsCertificates"])}')

        certificate_name = cert_details['tlsCertificates'][0]['name']
        site_domain_name = cert_details['tlsCertificates'][0]['domainName']
        domain_validation_records = cert_details['tlsCertificates'][0]['domainValidationRecords']

        host_name = '.'.join(site_domain_name.rsplit('.')[-2:])
        hosted_zone_id = self.site_config.get('HOSTED_ZONES').get(host_name)

        response = dict(
            instance_name=instance_name,
            static_ip_name=static_ip_name,
            static_ip_address=static_ip_address,
            public_ip=public_ip,
            load_balancer_name=load_balancer_name,
            load_balancer_dns_name=load_balancer_dns_name,
            certificate_name=certificate_name,
            site_domain_name=site_domain_name,
            host_name=host_name,
            hosted_zone_id=hosted_zone_id,
            domain_validation_records=domain_validation_records
        )

        return response

    def cleanup_network_resources(self, resource_names):

        resource_names = resource_names

        instance_name = resource_names.get('instance_name')
        load_balancer_name = resource_names.get('load_balancer_name')
        site_domain_name = resource_names.get('site_domain_name')
        hosted_zone_id = resource_names.get('hosted_zone_id')

        self.logger.info(f"Cleaning up network resources for instance {instance_name}")
        self.logger.info(f"Resource names: {resource_names}")

        if not resource_names:
            self.logger.warning(f"No networkresources found for {instance_name}")
            return None

        # 1) check that load balancer exists
        try:
            lb_details = self.lightsail.get_load_balancer(loadBalancerName=load_balancer_name)
        except Exception:
            self.logger.info(f"Load balancer {load_balancer_name} does not exist")
            raise

        load_balancer_dns_name = lb_details['loadBalancer']['dnsName']

        self.logger.info(f"1) Deleting Route 53 A record for instance {instance_name}")
        if self.check_route53_record_set(hosted_zone_id, 'A', site_domain_name):
            try:
                self.route53.change_resource_record_sets(
                    HostedZoneId=hosted_zone_id,
                    ChangeBatch={
                        'Changes': [{
                            'Action': 'DELETE',
                            'ResourceRecordSet': {
                                'Name': site_domain_name,
                                'Type': 'A',
                                'AliasTarget': {
                                    'DNSName': load_balancer_dns_name,
                                    'EvaluateTargetHealth': False,
                                    'HostedZoneId': AWS_LIGHTSAIL_ELB_HOSTED_ZONE
                                }
                            }
                        }]
                    }
                )
            except Exception as e:
                self.logger.error(f"Error deleting A record: {e}")
            else:
                self.logger.info(f"Successfully deleted A record for instance {instance_name}")
        else:
            self.logger.info(f"Route53 A record does not exist for instance {instance_name}")

        self.logger.info(f"2) Deleting load balancer for instance {instance_name}")
        try:
            self.lightsail.delete_load_balancer(
                loadBalancerName=resource_names['load_balancer_name']
            )
        except Exception as e:
            self.logger.error(f"Error deleting load balancer: {e}")
        else:
            self.logger.info(f"Successfully deleted load balancer for instance {instance_name}")

        self.logger.info(f"3) Deleting DNS Validation record for instance {instance_name}")
        try:
            for record in resource_names['domain_validation_records']:
                record_name = record['name']
                record_type = record['type']
                record_value = record['value']
                if self.check_route53_record_set(hosted_zone_id, record_type, record_name):
                    self.route53.change_resource_record_sets(
                        HostedZoneId=hosted_zone_id,
                        ChangeBatch={
                            'Changes': [{
                                'Action': 'DELETE',
                                'ResourceRecordSet': {
                                    'Name': record_name,
                                    'Type': record_type,
                                    'TTL': 300,
                                    'ResourceRecords': [{'Value': record_value}]
                                }
                            }]
                        }
                    )
                else:
                    self.logger.info(f"Route53 {record_type} record set does not exist for instance {instance_name}")

        except Exception as e:
            self.logger.error(f"Error deleting Validation CNAME records: {e}")
        else:
            self.logger.info(f"Successfully deleted validation CNAME records for instance {instance_name}")

    def release_static_ip(self, instance_name, static_ip_name=None):
        if not static_ip_name:
            instance_resources = self.get_resource_names(instance_name)
            static_ip_name = instance_resources.get('static_ip_name')

        static_ip = self.check_instance_static_ip(instance_name=instance_name, static_ip_name=static_ip_name)

        ip_address = static_ip.get('ip_address')
        self.remove_ip_from_mongodb_access_list(ip_address=ip_address)

        response = {}
        if not static_ip.get('staticIp', {}).get('isAttached', False):
            try:
                self.lightsail.detach_static_ip(staticIpName=static_ip_name)
            except Exception as e:
                self.logger.error(f"Error removing static IP {instance_name}: {e}")
            finally:
                response = self.lightsail.release_static_ip(staticIpName=static_ip_name)

        return response

    def delete_instance(self, instance_name, with_all_resources=True):

        instance_resources = self.get_resource_names(instance_name)
        self.logger.info(f"Attempting to delete instance: {instance_name}")
        self.logger.info(f"Instance resources: {instance_resources}")

        if with_all_resources:
            self.logger.info(f"Cleaning up network resources for instance: {instance_name}")
            self.cleanup_network_resources(resource_names=instance_resources)

        static_ip_name = instance_resources.get('static_ip_name')
        if static_ip_name:
            self.logger.info(f"Releasing static IP for instance: {instance_name}, {static_ip_name}")
            self.release_static_ip(instance_name=instance_name, static_ip_name=static_ip_name)
        else:
            self.logger.info(f"No static IP found for instance: {instance_name}")

        self.logger.info(f"Deleting instance: {instance_name}")
        try:
            response = self.lightsail.delete_instance(instanceName=instance_name, forceDeleteAddOns=True)
        except Exception as e:
            self.logger.error(f"Error deleting instance {instance_name}: {e}")
            response = e
        else:
            self.logger.info(f"Successfully deleted instance: {instance_name}")

        return response


if __name__ == '__main__':
    import os
    import argparse

    from dotenv import dotenv_values

    parser = argparse.ArgumentParser()
    parser.add_argument('command', choices=['create', 'check'])
    parser.add_argument('-e', '--env_file', type=str, help='Environment file for application')

    args = parser.parse_args()

    config_values = dotenv_values(args.env_file)
    config = dict(
        application_name=config_values.get('THAPPNAME'),
        brand_urn=config_values.get('THBRANDURN'),
        site_api_key=config_values.get('THAPIKEY'),
        site_maps_key=config_values.get('THMAPSKEY'),
        environment=config_values.get('THENV', 'sandbox')
    )

    client = LightsailClient(**config)

    if args.command == 'create':
        client.create_instance()
        client.setup_lb_tls_for_instance()
    elif args.command == 'check':
        resources = client.get_resource_names(client.instance_name)
        print(f"Resources: {json.dumps(resources, indent=2)}")
