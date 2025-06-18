import apostrophe from 'apostrophe';

apostrophe({
  root: import.meta,
  shortName: 'essential-app',
  baseUrl: 'http://localhost:3000',
  modules: {
    // Apostrophe module configuration
    // *******************************
    //
    // NOTE: most configuration occurs in the respective modules' directories.
    // See modules/@apostrophecms/page/index.js for an example.
    //
    // Any modules that are not present by default in Apostrophe must at least
    // have a minimal configuration here to turn them on: `moduleName: {}`
    // ***********************************************************************
    // `className` options set custom CSS classes for Apostrophe core widgets.
    'admin-ui-overrides': {},
    '@apostrophecms/page': {
      options: {
        /*
        TODO: should also park:
          - product listing: /products
          - faq
          - privacy / terms
          - /user
          - /order-status-update 
        */
        park: [
          {
            title: 'Checkout',
            type: 'thirstie-checkout',
            slug: '/checkout',
            parkedId: 'thirstieCheckout'
          },
          {
            title: 'Sitemap',
            type: 'sitemap-page',
            slug: '/sitemap',
            parkedId: 'thirstieSitemapPage'
          },
          {
            title: 'Styleguide',
            type: 'styleguide-page',
            slug: '/styleguide',
            parkedId: 'thirstieStyleguidePage'
          }
        ]
      }
    },
    '@apostrophecms/rich-text-widget': {
      options: {
        className: 'th-rich-text'
      }
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 'th-image-widget'
      }
    },
    '@apostrophecms/video-widget': {
      options: {
        className: 'th-video-widget'
      },
    },
    '@apostrophecms/sitemap': {
      options: {
        cacheLifetime: 1800,
        excludeTypes: [ 'exclusive-page', 'category' ],  // TODO: review needed types
        piecesPerBatch: 500
      }
    },
    '@apostrophecms/favicon': {},
    '@apostrophecms/seo': {},
    // `asset` supports the project's build for client-side assets.
    asset: {},
    // theming variables
    'theme-widget': {},
    // use vite for asset bundling and hot module reloading
    '@apostrophecms/vite': {},
    // The project's first custom page type.
    'thirstie-checkout': {},
    'default-page': {},
    'product-line': {},
    'recipe': {},
    'product-line-page': {},
    'recipe-page': {},
    'sitemap-page': {},
    'styleguide-page': {},
    'product-grid-widget': {},
    'recipe-grid-widget': {},
    'thirstie-disclaimer-widget': {}
  }
});
