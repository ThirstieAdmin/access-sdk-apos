export default {
  options: {
    linkWithType: [ '@apostrophecms/any-page-type', 'product-line', 'recipe' ]
  },
  styles: {
    add: {
      margin: 'margin',
      padding: 'padding',
      zoomOnHover: {
        type: 'boolean',
        label: 'Apply zoom on hover effect',
        selector: '.th-image-widget__wrapper',
        class: 'th-image-widget__zoom'
      }
    }
  }
};