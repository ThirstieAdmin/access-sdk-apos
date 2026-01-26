import { standardPresetColors } from '../../lib/presets.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Social Links',
    icon: 'web'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Title/Label'
      },
      socialAccounts: {
        type: 'array',
        fields: {
          add: {
            title: {
              type: 'string',
              label: 'Platform Name',
              help: 'The name of the social account (e.g., Facebook, Instagram). Will be used for accessibility purposes.'
            },
            url: {
              type: 'string',
              label: 'URL'
            },
            icon: {
              type: 'select',
              label: 'Icon',
              choices: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'Pinterest', value: 'pinterest' },
                { label: 'YouTube', value: 'youtube' }
              ]
            }
          }
        }
      },
      textColor: {
        type: 'color',
        label: 'Text Color',
        options: standardPresetColors
      },
      iconBackgroundColor: {
        type: 'color',
        label: 'Icon Background Color',
        options: standardPresetColors
      },
      iconColor: {
        type: 'color',
        label: 'Icon Line Color',
        options: standardPresetColors
      }
    },
    group: {
      content: {
        label: 'Basics',
        fields: [
          'title', 'socialAccounts', 'textColor', 'iconBackgroundColor', 'iconColor'
        ]
      }
    }
  }
};
