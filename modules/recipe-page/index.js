const standardPresetColors = [
  '--primary-color', '--primary-contrasting-color', '--secondary-color', '--secondary-contrasting-color',
  '--th-c-alertSuccessPrimary', '--th-c-alertWarningPrimary', '--th-c-alertWrongPrimary',
  'rgb(59, 130, 246)', 'rgba(59, 130, 246, 0.5)',
  'transparent'
];

export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Recipe Page',
    pluralLabel: 'Recipe Pages',
    perPage: 12
  },
  fields: {
    add: {
      subTitle: {
        type: 'string',
        label: 'Subtitle',
        required: false
      },
      listingType: {
        type: 'select',
        label: 'Listing Type',
        choices: [
          {
            label: 'Thumbnails',
            value: 'thumbnails'
          },
          {
            label: 'Cards',
            value: 'cards'
          }
        ]
      },
      hideBreadcrumb: {
        type: 'boolean',
        label: 'Hide Breadcrumb',
        help: 'Hide the breadcrumb navigation on the recipe pages',
        def: false
      },
      textColor: {
        type: 'color',
        label: 'Text Color',
        options: {
          presetColors: standardPresetColors
        }
      },
      backgroundColor: {
        type: 'color',
        label: 'Recipe Background Color',
        options: {
          presetColors: standardPresetColors
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['title', 'subTitle', 'listingType', 'hideBreadcrumb','textColor', 'backgroundColor']
      }
    }
  }
};