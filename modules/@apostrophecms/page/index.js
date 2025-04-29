// This configures the @apostrophecms/page module to add a "home" page type to the
// pages menu

export default {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: 'product-line-page',
        label: 'Product Line Page'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      }
    ]
  }
};
