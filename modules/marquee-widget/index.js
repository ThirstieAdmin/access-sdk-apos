import { standardPresetColors } from '../../lib/presets.js';
import { default as richTextOptions } from '../../lib/rich-text-options.js';
import { default as urlScheme } from '../../lib/url-scheme.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Marquee Widget',
    icon: 'image-plus'
  },
  // see list of icons in node_modules/@apostrophecms/vue-material-design-icons
  // or https://pictogrammers.com/library/mdi/
  icons: {
    'image-plus': 'ImagePlus'
  },
  /* TODO: 
  - add title, content and CTA fields.
  - add side image option with image position (left or right) and text alignment (left, center, right) options.
  */
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Title',
        help: 'Add a title to the marquee. This will appear above the caption.'
      },
      caption: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': richTextOptions,
            '@apostrophecms/html': {}
          }
        }
      },
      showCTA: {
        type: 'boolean',
        label: 'Show Call to Action',
        def: false
      },
      ctaText: {
        type: 'string',
        label: 'Call to Action Text',
        def: 'Learn More',
        if: {
          showCTA: true
        }
      },
      ctaNav: {
        type: 'array',
        label: 'Call to Action navigation',
        titleField: 'label',
        options: {
          max: 1
        },
        fields: {
          add: {
            ...urlScheme,
          }
        },
        if: {
          showCTA: true
        }
      },
      image: {
        type: 'area',
        label: 'Background Image',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: [ 'image', 'caption' ]
      }
    }
  },
  styles: {
    add: {
      backgroundColor: {
        type: 'color',
        label: 'Background Color',
        help: 'Set the background color for the marquee. This will apply to the area behind the image and caption.',
        selector: 'marquee-widget__container',
        property: 'background-color',
        def: 'inherit',
        options: standardPresetColors
      },
      textColor: {
        type: 'color',
        label: 'Text Color',
        help: 'Set the text color for the marquee.',
        selector: 'marquee-widget__figure',
        property: '--th-image-widget__caption-text-color',
        options: standardPresetColors
      },
      textFontFamily: {
        type: 'string',
        label: 'Text Font Family',
        selector: 'marquee-widget__figure',
        property: '--th-image-widget__caption-font-family',
        def: 'var(--primary-font-family)'
      }
    }
  }
};

/* 
(SHIPPING IN AZ, CA, CO, CT, DC, FL, IA, ID, IL, KY, LA, MD, MN, MO, MT, NE, NV, NH, NJ, NM, ND, NY, OR, SC, VA, WA, WI, WV, WY)
OR CLICK HERE TO FIND IN STORE

font-family
*/