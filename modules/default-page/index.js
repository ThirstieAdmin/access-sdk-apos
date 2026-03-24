import { default as areaWidgetFullConfig } from '../../lib/area.js';
import { standardPresetColors } from '../../lib/presets.js';

export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Default Page'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          widgets: areaWidgetFullConfig
        }
      },
      contentClass: {
        type: 'string',
        label: 'Class to apply to th-content'
      },
      contentMargin: {
        type: 'string',
        label: 'Margin property for th-content'
      },
      contentPadding: {
        type: 'string',
        label: 'Padding property for th-content'
      },
      contentMaxWidth: {
        type: 'string',
        label: 'max-width property for th-content'
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'main',
          'contentClass',
          'contentMargin',
          'contentPadding',
          'contentMaxWidth'
        ]
      }
    }
  }
};
