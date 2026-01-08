# Environment File Creation Instructions

The file `env.tpl` provides a template for the environment file.

Required inputs that are unique to each site: 
- STOREFRONT_DOMAIN: The second-level domain where the site will be hosted (e.g., `fujiwhiskey`, exclude the .com or .net part). This will be used as the extension for the environment file (e.g., `.env.fujiwhiskey`)
- THAPPNAME: The application canonical_name, or slug (e.g. `fuji_whiskey`)
- THAPIKEY: The Thirstie API key for your application

This value can be generated using the script in `scripts/gen_secret.js`:
- THEXPRESS_SECRET: The Express secret for your application

These values are set following the defaults in `.env-admin` -- use dotenv to set these as environment variables
- THENV: The environment (sandbox or production)
- THBASEURL: The base URL of your application
- THMAPSKEY: The Google Maps API key for your application
- APOS_MONGODB_URI: The MongoDB URI for your application
- APOS_S3_BUCKET: The S3 bucket name for your application
- APOS_S3_REGION: The S3 region for your application
- APOS_S3_KEY: The S3 access key for your application
- APOS_S3_SECRET: The S3 secret key for your application

After creating the `.env` file, ensure it is properly configured and NOT committed to your version control system. Then execute the following command to initialize the site and creates an admin user with the username `thirstieadmin`.
- `npx dotenv -e .env -- node app @apostrophecms/user:add thirstieadmin admin`
- the script will prompt for a password, use the password in the `APOS_ADMIN_SECRET` value in `.env-admin`

