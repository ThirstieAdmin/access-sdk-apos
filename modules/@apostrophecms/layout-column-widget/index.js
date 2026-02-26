export default {
  fields: {
    add: {
      content: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {},
            '@apostrophecms/html': {},
            'thirstie-disclaimer': {},
            'product-grid': {},
            'recipe-grid': {},
            'button': {},
            'marquee': {}
          }
        }
      }
    }
  },
  styles: {
    add: {
      widgetMargin: 'margin',
      widgetPadding: 'padding'
    }
  }
};