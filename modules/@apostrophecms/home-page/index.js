import { default as areaWidgetFullConfig } from '../../../lib/area.js';

export default {
  options: {
    label: 'Home Page'
  },
  fields: {
    add: {
      hideAddressWidget: {
        type: 'boolean',
        label: 'Hide Address Widget',
        help: 'Check this box to hide the address widget (if Location Type is "address entry").',
        def: false
      },
      main: {
        type: 'area',
        options: {
          widgets: areaWidgetFullConfig
        }
      },
      hero: {
        type: 'area',
        options: {
          widgets: areaWidgetFullConfig
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'main',
          'hero',
          'hideAddressWidget'
        ]
      }
    }
  }
};
