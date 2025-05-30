import { default as richTextOptions } from '../../lib/richTextOptions.js';

export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Styleguide',
    orphan: true,
    singleton: true,
    loginRequired: true
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