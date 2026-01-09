import apostrophe from 'apostrophe';

const BASE_URL = process.env.THBASEURL;
const THAPPNAME = process.env.THAPPNAME;

apostrophe({
  root: import.meta,
  shortName: THAPPNAME,
  baseUrl: BASE_URL,
  port: process.env.PORT || 3000,
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
          - faq
          - privacy / terms
          - /user
          - /order-status-update 
        */
        park: [
          {
            title: 'Our Products',
            type: 'product-line-page',
            slug: '/products',
            parkedId: 'productListingPage'
          },
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
          },
          {
            title: 'Thirstie Terms of Use',
            type: 'thirstie-termsofuse-page',
            slug: '/terms-of-use',
            parkedId: 'thirstieTermsOfUsePage'
          },
          {
            title: 'Thirstie Privacy Policy',
            type: 'thirstie-privacy-page',
            slug: '/privacy-policy',
            parkedId: 'thirstiePrivacyPage'
          },
          {
            title: 'Thirstie FAQ',
            type: 'thirstie-faq-page',
            slug: '/faq',
            parkedId: 'thirstieFaqPage'
          },
          {
            title: 'Thirstie Order Status',
            type: 'thirstie-orderstatus-page',
            slug: '/order-status-update',
            parkedId: 'thirstieOrderStatusPage'
          },
          {
            title: 'Thirstie Support',
            type: 'thirstie-support-page',
            slug: '/support',
            parkedId: 'thirstieSupportPage'
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
    'thirstie-termsofuse-page': {},
    'thirstie-privacy-page': {},
    'thirstie-faq-page': {},
    'thirstie-orderstatus-page': {},
    'thirstie-support-page': {},
    'product-grid-widget': {},
    'recipe-grid-widget': {},
    'thirstie-disclaimer-widget': {}
  }
});
