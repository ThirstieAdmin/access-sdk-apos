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

from jinja2 import Template, Environment, PackageLoader, select_autoescape
from requests.auth import HTTPDigestAuth


MAX_PAGES = 10
DEFAULT_BASE_URL_FOR_ENVIRONMENT = {
    'dev': 'getthirstie.com',
    'sandbox': 'sandbox.thirstie.com',
    'prod': 'thirstie.com'
    }
HOSTED_ZONES = {
    'getthirstie.com': 'Z1SYISUN6KCJA',
    'sandbox.thirstie.com': 'Z00186611GKEFSLY2SRZ1',
    'thirstie.com': 'Z3AC37MGDUJYRO'
}

# Lightsail configuration
# - ELB has it's own hosted zone
AWS_REGION = 'us-east-2'
AWS_LIGHTSAIL_ELB_HOSTED_ZONE = 'Z3AADJGX6KTTL2'
DEFAULT_AV_ZONE = 'us-east-2a'
DEFAULT_BLUEPRINT_ID = 'ubuntu_24_04'
DEFAULT_BUNDLE_ID = 'small_3_0'

APOS_MONGODB_CONN_STRING_TPL = 'mongodb+srv://{{APOS_MONGODB_USER}}:{{APOS_MONGODB_SECRET}}@{{APOS_MONGODB_DOMAIN}}/{{INSTANCE_NAME}}?appName={{APOS_MONGODB_CLUSTER}}&retryWrites=true&w=majority'
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


def create_site_config(instance_name, brand_urn, site_api_key, site_maps_key, th_environment='sandbox', ssm_key=SSM_BASE_CONFIG_KEY):

    ssm_client = boto3.client('ssm', region_name=AWS_REGION)
    params = ssm_client.get_parameter(Name=ssm_key, WithDecryption=True).get('Parameter', {}).get('Value')
    base_config = json.loads(params)

    base_url = DEFAULT_BASE_URL_FOR_ENVIRONMENT.get(th_environment, DEFAULT_BASE_URL_FOR_ENVIRONMENT['sandbox'])
    site_hosted_zone = HOSTED_ZONES.get(base_url)
    apos_mongodb_conn_str = Template(APOS_MONGODB_CONN_STRING_TPL).render(
        INSTANCE_NAME=instance_name,
        APOS_MONGODB_USER=base_config.get('APOS_MONGODB_USER'),
        APOS_MONGODB_SECRET=base_config.get('APOS_MONGODB_SECRET'),
        APOS_MONGODB_DOMAIN=base_config.get('APOS_MONGODB_DOMAIN'),
        APOS_MONGODB_CLUSTER=base_config.get('APOS_MONGODB_CLUSTER')
    )

    site_config = {
        'instance_name': instance_name,
        'brand_urn': brand_urn,
        'site_api_key': site_api_key,
        'site_maps_key': site_maps_key,
        'th_environment': th_environment,
        'base_url': base_url,
        'site_server_name': f'{brand_urn}.{base_url}',
        'site_environment': th_environment,
        'site_hosted_zone': site_hosted_zone,
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
    env = Environment(loader=PackageLoader('lightsail', 'templates'), autoescape=select_autoescape(['html', 'xml']))
    template = env.get_template(template_name)
    return template.render(**site_config)


class LightsailClient:
    """
    A client for managing AWS Lightsail instances with integrated Route 53 DNS and TLS support.

    This client simplifies deploying web applications to Lightsail by handling instance creation,
    load balancer setup, TLS certificate provisioning, and DNS configuration.

    Basic usage:
        client = LightsailClient(region='us-east-2', environment='test')

        # Create an instance with a launch script
        client.create_instance('my-app', brand_urn='mybrand', site_api_key='...', ...)

        # Set up load balancer with TLS and DNS
        client.setup_lb_tls_for_instance('my-app', 'getthirstie.com')

        # List existing instances
        instances = client.get_instances(service_tag='thirstieaccess')

        # Clean up resources
        client.delete_instance('my-app', with_all_resources=True)
    """

    def __init__(self, instance_name, brand_urn, site_api_key, site_maps_key, environment='sandbox',region=AWS_REGION):
        self.region_name = region
        self.lightsail = boto3.client('lightsail', region_name=self.region_name)
        self.route53 = boto3.client('route53')

        self.logger = get_logger('LightsailClient')
        self.environment = environment

        self.instance_name = instance_name
        self.site_config = create_site_config(instance_name, brand_urn, site_api_key, site_maps_key, th_environment=environment)
        self.resource_names = self.configure_resource_names(instance_name)

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
        
        if response.status_code == 200:
            return response.json()
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

    def add_ip_to_mongodb_access_list(self, ip_address):

        if not self.check_mongodb_access_list(ip_address):
            APOS_REPO_NAME = self.site_config.get('APOS_REPO_NAME')
            data = [{"comment": f"{APOS_REPO_NAME}-{self.instance_name}","cidrBlock":f"{ip_address}/32"}]

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

    def configure_resource_names(self, instance_name, host_name=None):
        environment = getattr(self, 'environment', 'sandbox')

        host_name = host_name or DEFAULT_BASE_URL_FOR_ENVIRONMENT.get(environment)
        try:
            hosted_zone_id = self.site_config['site_hosted_zone']
        except Exception:
            self.logger.error(f"Could not find hosted zone for host_name: {host_name}")

        sld, tld = host_name.rsplit('.', 1)
        sld = sld.replace('.', '-')

        site_domain_name = f'{instance_name}.{host_name}'

        cfg = dict(
            instance_name=instance_name,
            host_name=host_name,
            site_domain_name=site_domain_name,
            certificate_name=f'{instance_name}-{sld}-{tld}-lbcert',
            load_balancer_name=f'{instance_name}-{sld}-lb',
            static_ip_name=f'{instance_name}-{sld}-static-ip',
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
        Retrieve 
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

    def create_instance(self, instance_name=None):
        '''
        Create and provision a new lightsail instance

        TO INSPECT, CONNECT TO INSTANCE
        # inspect logs with `less -F /var/log/cloud-init-output.log`
        # sudo su - nodeapps
        # pm2 list
        # journalctl -xeu nginx.service
        # systemctl status nginx.service
        '''

        instance_name = instance_name or self.instance_name
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
            logging.info('closing ports')
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

        result = {
            'private_ip': response.get('instance', {}).get('privateIpAddress'),
            'public_ip': response.get('instance', {}).get('publicIpAddress'),
            'is_static': response.get('instance', {}).get('isStaticIp', False)
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

    # instance management / delete_instance methods
    #########################

    def get_load_balancer_for_instance(self, instance_name):
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

        load_balancer_name = lb['name']
        load_balancer_dns_name = lb['dnsName']

        cert_details = self.lightsail.get_load_balancer_tls_certificates(loadBalancerName=load_balancer_name)
        assert len(cert_details['tlsCertificates']) == 1, f'Count of certificates attached to load balancer = {len(cert_details['tlsCertificates'])}'
        certificate_name = cert_details['tlsCertificates'][0]['name']
        site_domain_name = cert_details['tlsCertificates'][0]['domainName']
        host_name = site_domain_name.lstrip(f"{instance_name}.")
        domain_validation_records = cert_details['tlsCertificates'][0]['domainValidationRecords']

        hosted_zone_id = HOSTED_ZONES.get(host_name)

        response = dict(
            instance_name=instance_name,
            load_balancer_name=load_balancer_name,
            load_balancer_dns_name=load_balancer_dns_name,
            certificate_name=certificate_name,
            site_domain_name=site_domain_name,
            host_name=host_name,
            hosted_zone_id=hosted_zone_id,
            domain_validation_records=domain_validation_records
        )

        return response

    def cleanup_network_resources(self, instance_name):

        instance_resources = self.get_resource_names(instance_name)

        if not instance_resources:
            self.logger.warning(f"No networkresources found for {instance_name}")
            return None

        # 1. Delete Route 53 A record
        try:
            self.route53.change_resource_record_sets(
                HostedZoneId=instance_resources['hosted_zone_id'],
                ChangeBatch={
                    'Changes': [{
                        'Action': 'DELETE',
                        'ResourceRecordSet': {
                            'Name': instance_resources['site_domain_name'],
                            'Type': 'A',
                            'AliasTarget': {
                                'DNSName': instance_resources['load_balancer_dns_name'],
                                'EvaluateTargetHealth': False,
                                'HostedZoneId': AWS_LIGHTSAIL_ELB_HOSTED_ZONE
                            }
                        }
                    }]
                }
            )
        except Exception as e:
            self.logger.error(f"Deleting A record: {e}")
        else:
            self.logger.info(f"Successfully deleted A record for instance {instance_name}")

        # 2. Delete load balancer (this incurs charges)
        try:
            self.lightsail.delete_load_balancer(
                loadBalancerName=instance_resources['load_balancer_name']
            )
        except Exception as e:
            self.logger.error(f"Deleting load balancer: {e}")
        else:
            self.logger.info(f"Successfully deleted load balancer for instance {instance_name}")

        # 4. Delete DNS validation record
        try:
            for record in instance_resources['domain_validation_records']:
                record_name = record['name']
                record_type = record['type']
                record_value = record['value']
                self.route53.change_resource_record_sets(
                    HostedZoneId=instance_resources['hosted_zone_id'],
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
        except Exception as e:
            self.logger.error(f"Deleting Validation CNAME records: {e}")
        else:
            self.logger.info(f"Successfully deleted validation CNAME records for instance {instance_name}")
        
        self.release_static_ip(instance_name=instance_name, static_ip_name=instance_resources.get('static_ip_name'))

        return instance_resources

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
                response = e
            else:
                response = self.lightsail.release_static_ip(staticIpName=static_ip_name)

        return response

    def delete_instance(self, instance_name, with_all_resources=True):

        if with_all_resources:
            self.cleanup_network_resources(instance_name)

        self.logger.info(f"Deleting instance: {instance_name}")

        try:
            response = self.lightsail.delete_instance(instanceName=instance_name, forceDeleteAddOns=True)
        except Exception as e:
            self.logger.error(f"Error deleting instance {instance_name}: {e}")
            response = e

        return response