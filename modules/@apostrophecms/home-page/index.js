import { default as richTextOptions } from '../../../lib/rich-text-options.js';

export default {
  options: {
    label: 'Home Page'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': richTextOptions,
            '@apostrophecms/html': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {},
            'thirstie-disclaimer': {},
            'product-grid': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'main'
        ]
      }
    }
  }
};
