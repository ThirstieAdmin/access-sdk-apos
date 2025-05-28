import { default as richTextOptions } from '../../../lib/richTextOptions.js';

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
            'thirstie-disclaimer': {}
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
