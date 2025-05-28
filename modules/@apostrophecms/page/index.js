// This configures the @apostrophecms/page module to add a "home" page type to the
// pages menu

export default {
  options: {
    types: [
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      },
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: 'product-line-page',
        label: 'Product Line Page'
      },
      {
        name: 'sitemap-page',
        label: 'Sitemap Page'
      },
      {
        name: 'thirstie-checkout',
        label: 'Checkout'
      }
    ]
  }
};
