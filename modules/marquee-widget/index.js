import { standardPresetColors } from '../../lib/presets.js';
import { default as richTextOptions } from '../../lib/rich-text-options.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Marquee Widget',
    icon: 'imageplus'
  },
  // see list of icons in node_modules/@apostrophecms/vue-material-design-icons
  // or https://pictogrammers.com/library/mdi/
  icons: {
    imageplus: 'ImagePlus'
  },
  fields: {
    add: {
      caption: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': richTextOptions,
            '@apostrophecms/html': {}
          }
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
      },
      textColor: {
        type: 'color',
        label: 'Text Color',
        options: standardPresetColors
      },
      textFontFamily: {
        type: 'string',
        label: 'Text Font Family'
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: [ 'image', 'caption', 'textColor', 'textFontFamily' ]
      }
    }
  }
};

/* 
(SHIPPING IN AZ, CA, CO, CT, DC, FL, IA, ID, IL, KY, LA, MD, MN, MO, MT, NE, NV, NH, NJ, NM, ND, NY, OR, SC, VA, WA, WI, WV, WY)
OR CLICK HERE TO FIND IN STORE

font-family
*/