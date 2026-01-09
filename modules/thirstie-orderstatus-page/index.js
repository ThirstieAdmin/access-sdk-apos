import { default as richTextOptions } from '../../lib/rich-text-options.js';

export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Thirstie Order Status Page',
    orphan: true,
    singleton: true,
    loginRequired: false
  },
  fields: {
    add: {
      additionalContent: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': richTextOptions,
            '@apostrophecms/html': {},
            '@apostrophecms/image': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'additionalContent'
        ]
      }
    }
  }
};