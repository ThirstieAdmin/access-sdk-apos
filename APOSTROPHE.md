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

## Apostrophe Docs: Making it your own

This boilerplate is designed so you can install and start running it right away. If you are starting a project that will go into production one day, there are a few things you should be sure to check:

- [x] **Update the shortname.** (`app.js`) You don't need to perform this step if you created your project using the CLI tool. The `shortname` option in `app.js` is used for the database name (unless another is given in the `@apostrophecms/db` module). You should change this to an appropriate project name before you start adding any users or content you would like to keep.
  - we do this via the `.env` file
- [x] **Update the Express.js session secret.** (`modules/@apostrophecms/express/index.js`) The secret is set to `undefined` initially in the `modules/@apostrophecms/express/index.js` file. You should update this to a unique string.
  - we do this via the `.env` file
- [x] **Decide if you want hot reloading on.** This boilerplate uses nodemon to restart the app when files are changed. In `modules/@apostrophecms/asset/index.js` there is an option enabled to refresh the browser on restart. If you like this, do nothing. If you don't, remove the option or set it to `false`. The option has no effect when the app is in production.
- [x] **Update the `className` options in `app.js`.** This option is set for core widget types to provide CSS styling hooks. It is namespaced with `bp-` for "boilerplate." You will likely want to update that to match your general CSS class naming practices.
  - this is set to `th-` for the theme

### You really want the docs

Right now, [all the juicy info is in the ApostropheCMS docs](https://docs.apostrophecms.org), so head over there and start reading! This boilerplate project is a fun introduction to the UI, but you'll want to know more to really try it out.

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
