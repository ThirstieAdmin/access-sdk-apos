import { standardPresetColors } from '../../lib/presets.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Feature Card',
    icon: 'content-copy-icon'
  },
  fields: {
    add: {
      featureTitle: {
        type: 'string',
        label: 'Title'
      },
      featureCaption: {
        type: 'string',
        label: ''
      },
      featureImage: {
        type: 'area',
        label: 'Card Image',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      ctaText: {
        type: 'string',
        label: 'CTA Text'
      },
      ctaType: {
        type: 'select',
        label: 'Type of Call to Action',
        choices: [
          {
            value: 'none',
            label: 'None'
          },
          {
            value: 'pageLinkText',
            label: 'Page Link Text'
          },
          {
            value: 'pageLinkButton',
            label: 'Page Link Button'
          }
        ]
      },
      _ctaPageLink: {
        label: 'Page Link',
        type: 'relationship',
        withType: '@apostrophecms/any-page-type',
        max: 1,
        builders: {
          areas: false,
          relationships: false,
          project: {
            title: 1,
            slug: 1,
            _url: 1,
            type: 1
          }
        },
        required: true
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: [ 'featureTitle', 'featureCaption', 'featureImage', 'ctaText', 'ctaType', '_ctaPageLink' ]}
    }
  }
};
