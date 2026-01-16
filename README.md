# Thirstie Accesss (Apostrophe / Thirstie SDK)

This repo contains the ApostropheCMS implementation of the Thirstie SDK. This implementation is the base for Thirstie Access sites.

See [APOSTROPHE.md](APOSTROPHE.md) for details on ApostropheCMS.
See [Thirstie Docs](https://docs.thirstie.com) for details on the Thirstie SDK.

## Principles

- deliver to the consumer clean e-commerce UX
- deliver a excellent development experience


## Running the project

Run `npm run dev` to build the Apostrophe UI and start the site up. Remember, this is during alpha development, so we're all in "dev mode." The `dev` script will watch for saves in client-side CSS and Javascript and trigger a build and page refresh if they are detected. It will also restart the app when server-side code is saved.

- Add credentials to `.env`, see `env.tpl` for structure.
- Create admin: `npx dotenv -e .env -- node app @apostrophecms/user:add myUsername admin`
  - (We usually create `thirstieadmin` user: `npx dotenv -e .env -- node app @apostrophecms/user:add thirstieadmin admin`)

Work to be done:

- [ ] github repo thirstiejs-starter-apos, following **Manual setup** above
- [ ] other extensions: open graph, pa11y, security-headers
  - see: https://apostrophecms.com/extensions?autocomplete=&license=openSource
- [ ] Add "/setup" page with instructions.  Including a note to remove before deploying (can be used as a "brown M&M test" for final site review)



# New site setup

1. Prerequisites: api keys, ensure sandbox access is enabled.
2. Create a new `.env` file with the appropriate environment variables for your site. (e.g., `THAPPNAME`, `THBASEURL`, `THAPIKEY`, etc.)
  - set THENV=sandbox
3. Create thirstieadmin user with `npx dotenv -e .env -- node app @apostrophecms/user:add thirstieadmin admin`
