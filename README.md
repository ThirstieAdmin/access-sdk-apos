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

- Add credentials to `.env.local`, see `env.tpl` for structure.

## Making it your own

This boilerplate is designed so you can install and start running it right away. If you are starting a project that will go into production one day, there are a few things you should be sure to check:

- [ ] **Update the shortname.** You don't need to perform this step if you created your project using the CLI tool. The `shortname` option in `app.js` is used for the database name (unless another is given in the `@apostrophecms/db` module). You should change this to an appropriate project name before you start adding any users or content you would like to keep.
- [ ] **Update the Express.js session secret.** The secret is set to `undefined` initially in the `modules/@apostrophecms/express/index.js` file. You should update this to a unique string.
- [ ] **Decide if you want hot reloading on.** This boilerplate uses nodemon to restart the app when files are changed. In `modules/@apostrophecms/asset/index.js` there is an option enabled to refresh the browser on restart. If you like this, do nothing. If you don't, remove the option or set it to `false`. The option has no effect when the app is in production.
- [ ] **Update the `className` options in `app.js`.** This option is set for core widget types to provide CSS styling hooks. It is namespaced with `bp-` for "boilerplate." You will likely want to update that to match your general CSS class naming practices.

## You really want the docs

Right now, [all the juicy info is in the ApostropheCMS docs](https://docs.apostrophecms.org), so head over there and start reading! This boilerplate project is a fun introduction to the UI, but you'll want to know more to really try it out.

## DESIDERATA

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
- [x] solve
    1. batch operation to update product list from Thirstie MPL (product-lines)
    2. admin widget to pull thirstie product list
        - see: https://docs.apostrophecms.org/tutorials/dynamic-routing.html
        - https://docs.apostrophecms.org/guide/module-configuration-patterns.html#the-three-types-of-module-customization
        - https://docs.apostrophecms.org/reference/module-api/module-overview.html#extendhandlers-self
        - https://docs.apostrophecms.org/guide/server-events.html#multiple-handlers-for-an-event
        - https://docs.apostrophecms.org/reference/server-events.html#apostrophecms-doc-events
        - https://docs.apostrophecms.org/guide/custom-ui.html#components-with-a-logic-mixin-are-safer-and-easier-to-override
        - https://docs.apostrophecms.org/guide/custom-ui.html#adding-custom-modal-controls

- [x] fix preview views
- [ ] custom css, import from @thirstie/ecomm-vue
- [ ] handle FUOC (e.g. footer logo)
- [ ] global settings
  - [x] favicon
  - custom code: `custom-code-editor-a3` not working in global settings
  - font: advanced, later
  - implement dataLayer / GTM configuration (thirstie defaults plus custom)
- [ ] pages
  - layout 
    - header, implement layout options
      - sub links
    - footer, implement standard/optional links, standard content, layout options
    - age gate
    - delivery address/zipcode
    - global alert banner (with begin/end date-time, queue)
    - checkout alert banner (with begin/end date-time, queue)
  - / 
  - /products
    - [ ] with swiper carousel (https://swiperjs.com/element)
  - /products/slug
  - /checkout
  - /terms & /privacy
  - /faq
  - /about
  - /recipes
  - /blogs /articles page type
  - /contact
  - /user
  - /order-status-update
- [ ] widgets
  - product card
  - product group
  - [ ] hero banner
    - [ ] with swiper carousel (https://swiperjs.com/element)
    - parallax display
  - nav card (see "our selection" on cocktailcourier.com)
  - signup form
- [ ] documentation
  - readme
  - /setup page (as "brown M&M" test)
    - see: https://site2.thirstie.dev/styleguide
  - docs.thirstie.com
- [ ] update Admin UI: [logo](https://docs.apostrophecms.org/guide/custom-ui.html#example-overriding-the-apostrophe-logo)
- [ ] github repo thirstiejs-starter-apos, following **Manual setup** above
- [ ] move as much of Access code base as practical
- [ ] implement deployment
- [ ] custom icons: https://docs.apostrophecms.org/reference/module-api/module-overview.html#icons
- [ ] other extensions: open graph, pa11y, security-headers
  - see: https://apostrophecms.com/extensions?autocomplete=&license=openSource

### header layouts

Desktop:
logo  < menu items >  CTA (*default)
logo | menu items --- CTA
logo --- menu items | CTA
menu items < logo > - CTA

or 

Address   < logo >   CTA
  -- menu items --

Mobile (w/ sticky address)
HB < logo > CTA (*default)
CTA < logo > HB
logo < CTA > HB

### footer layouts

(*) optional sections
NOTE: thirstie logo centered if brand trademark section disabled/empty
[ brand content top* ]
[ thirstie links ] [ brand links* ]
[thirstie logo ] [ brand trademark* ] 

### setup

Add "/setup" page with instructions.  Including a note to remove before deploying (can be used as a "brown M&M test" for final site review)


## other apostrophe docs

### setting CSS variables
To set CSS variables using global settings in ApostropheCMS, you can follow these steps:

Define the global fields: First, add the fields you want to use for your CSS variables in the @apostrophecms/global module configuration.

```js
// modules/@apostrophecms/global/index.js
export default {
  fields: {
    add: {
      primaryColor: {
        type: 'color',
        label: 'Primary Color'
      },
      secondaryColor: {
        type: 'color',
        label: 'Secondary Color'
      }
      // Add more color fields as needed
    }
  }
}
```

Create a custom widget or piece to inject the CSS variables: You'll need to create a custom widget or piece that will inject the CSS variables into your site's `<head>` tag.

N.B.: Make sure to define both the `init` method to place the template in the `<head>` and the `components` method associated with the template view. Components are a little like fragments, but they allow you to execute javascript.

```js
// modules/theme/index.js
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Theme Settings'
  },
  init(self) {
    self.apos.template.prepend('head', 'theme:customStyles');
  },
  components(self) {
    return {
      async customStyles(req, data) {}
    };
  }
};
```

Create a Nunjucks template to render the CSS variables: Create a new file modules/theme/views/customStyles.html and add the following content:

```js
{# modules/theme/views/customStyles.html #}
{% if data.global %}
  <style>
    :root {
      --primary-color: {{ data.global.primaryColor or '#000000' }};
      --secondary-color: {{ data.global.secondaryColor or '#ffffff' }};
      /* Add more variables as needed */
    }
  </style>
{% endif %}
```

Use the CSS variables in your stylesheets: Now you can use these variables in your CSS files:

```css
/* Your CSS file */
body {
  background-color: var(--primary-color);
  color: var(--secondary-color);
}
```

Update the global settings: In the ApostropheCMS admin UI, navigate to the "Global" settings and set your color values. These will now be applied as CSS variables across your site.
This approach allows you to manage your theme colors and other CSS variables through the ApostropheCMS admin interface, making it easy to update your site's appearance without modifying code.

#### preview
To hide an element in preview mode in ApostropheCMS, you can use the apos-area-widget-wrapper--preview class. This class is automatically added to widget wrappers when in preview mode. Here's how you can use it:

In your template or widget template, add a custom class to the element you want to hide:
<div class="my-element hide-in-preview">
  <!-- Your content here -->
</div>
In your CSS, use the following selector to hide the element when in preview mode:
.apos-area-widget-wrapper--preview .hide-in-preview {
  display: none;
}
Alternatively, if you want to hide an element only when it's empty in preview mode, you can use the apos-empty class, which Apostrophe adds to empty widgets in preview mode:

.apos-area-widget-wrapper--preview .apos-empty {
  display: none;
}
If you need to hide elements based on more complex conditions or if you're working with custom JavaScript, you can also check for preview mode programmatically:

if (apos.area.inPreviewMode()) {
  // Hide elements or perform other preview-specific actions
}
Remember that hiding elements in preview mode should be done thoughtfully to maintain a good editing experience. It's often better to show placeholder content or a visual indicator rather than completely hiding elements.


#### migration
- https://shop.us.glenfiddich.com/
- https://shop.austincocktails.com/
- https://shop.senorsangria.com/
- https://www.reservebar.com/collections/spirits?page=2
- https://us.thebar.com/engravable-bottles-personalized/whiskey


## Principles

- deliver to the consumer clean e-commerce UX
- deliver a excellent development experience


## Lightsail deploy

- Ubuntu (OS Only) 24 LTS
- SSH KeyPair: AccessSDKApos
- Instance Name: AccessSDKApos
- see: https://docs.apostrophecms.org/cookbook/ubuntu-hosting.html
  - use `npm run release:env` & `npm run serve:env` for deploy
