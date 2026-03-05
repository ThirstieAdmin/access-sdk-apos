import { standardPresetColors } from '../../../lib/presets.js';

export default {
  fields: {
    add: {
      content: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/layout': {},
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
      widgetPadding: 'padding',
      widgetMaxHeight: {
        type: 'integer',
        unit: 'px',
        label: 'Max Height for layout section',
        property: 'max-height'
      },
      backgroundColor: {
        type: 'color',
        label: 'section background color',
        property: 'background-color',
        options: standardPresetColors
      }
    }
  }
};