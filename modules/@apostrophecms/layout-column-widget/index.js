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
            'feature-card': {},
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
      widgetHeight: {
        type: 'string',
        label: 'Height for layout section',
        help: 'defaults to "auto", please include units',
        property: 'height',
        def: 'auto'
      },
      widgetMaxHeight: {
        type: 'integer',
        unit: 'px',
        label: 'Max Height for layout section (px)',
        help: 'Must be in px',
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