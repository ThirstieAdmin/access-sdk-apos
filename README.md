# ApostropheCMS essentials starter kit

## Getting started

This Starter Kit, also known as a boilerplate project, serves as a template for initiating new projects and is intended for use in two main ways:

1. **Using Our CLI Tool**: Run our [CLI tool](https://github.com/apostrophecms/cli) to clone this template locally, install its dependencies, and set up an initial admin user. You accomplish this using:
   
   `apos create <my-project-name>`
  
2. **Manual Setup**: Manually `git clone` this repository and install its dependencies using `npm install`. Add an initial admin user with `node app @apostrophecms/user:add admin admin`.

For those who need to create multiple projects with additional base modules, consider [forking this repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-forks) into your organizational or personal GitHub account. Customize it to fit your needs. To use your customized template, run the following CLI command:

  `apos create <project-name> --starter=<repo-name>`

Here, `<repo-name>` should be the URL of your forked repository, excluding the `https://github.com/` part.

**Note: This template is NOT designed to be installed into an existing project.**

## Running the project

Run `npm run dev` to build the Apostrophe UI and start the site up. Remember, this is during alpha development, so we're all in "dev mode." The `dev` script will watch for saves in client-side CSS and Javascript and trigger a build and page refresh if they are detected. It will also restart the app when server-side code is saved.

## Making it your own

This boilerplate is designed so you can install and start running it right away. If you are starting a project that will go into production one day, there are a few things you should be sure to check:

- [ ] **Update the shortname.** You don't need to perform this step if you created your project using the CLI tool. The `shortname` option in `app.js` is used for the database name (unless another is given in the `@apostrophecms/db` module). You should change this to an appropriate project name before you start adding any users or content you would like to keep.
- [ ] **Update the Express.js session secret.** The secret is set to `undefined` initially in the `modules/@apostrophecms/express/index.js` file. You should update this to a unique string.
- [ ] **Decide if you want hot reloading on.** This boilerplate uses nodemon to restart the app when files are changed. In `modules/@apostrophecms/asset/index.js` there is an option enabled to refresh the browser on restart. If you like this, do nothing. If you don't, remove the option or set it to `false`. The option has no effect when the app is in production.
- [ ] **Update the `className` options in `app.js`.** This option is set for core widget types to provide CSS styling hooks. It is namespaced with `bp-` for "boilerplate." You will likely want to update that to match your general CSS class naming practices.

## You really want the docs

Right now, [all the juicy info is in the ApostropheCMS docs](https://docs.apostrophecms.org), so head over there and start reading! This boilerplate project is a fun introduction to the UI, but you'll want to know more to really try it out.

## DESIDERATA

- customize repo
    - className prefix -> 'th-' or 'thbp-' (thirstie boilerplate) 
    - load SDK as dependency
        - `./modules/asset/ui/src/index.js`
        - if possible/easy, leverage SSR
    - basic pages/layout: most settings should be on components/widgets
        - landing
        - header
        - footer 
            - compliance
            - contact & social
        - plp / catagory widgets
        - product detail page
        - recipes
        - user
        - legal/compliance: FAQ, Privacy, Terms, etc.
        - checkout
        - favicon
        - global banner / alert
        - custom code

    - implement dataLayer / GTM configuration
        - Thirstie defaults, plus custom
    - rewrite README
    - implement tests

- cli to automate the other steps in [Making it your own](#making-it-your-own)
    - generate app config for Thirstie API /SDK
    - shortname -> Thirstie app canonical name
    - session secret
    - do not touch hot reloading

- create process / procedures for upgrading

- create deploy / staging process

- Nice to have enhancements
    - customize /login route
    - use thirstie auth for admin login [see](https://docs.apostrophecms.org/guide/custom-login-requirements.html)


TTD:
- [ ] github repo thirstiejs-starter-apos
- [ ] move as much of Access code base as practical
- [ ] implement deployment
