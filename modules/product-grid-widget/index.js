const standardPresetColors = [
  '--primary-color', '--primary-contrasting-color', '--secondary-color', '--secondary-contrasting-color',
  '--th-c-alertSuccessPrimary', '--th-c-alertWarningPrimary', '--th-c-alertWrongPrimary',
  'rgb(59, 130, 246)', 'rgba(59, 130, 246, 0.5)',
  'transparent'
];

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Thirstie Product Grid',
    icon: 'bottle'
  },
  // see list of icons in node_modules/@apostrophecms/vue-material-design-icons
  // or https://pictogrammers.com/library/mdi/
  icons: {
    bottle: 'BottleWine'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Title'
      },
      textColor: {
        type: 'color',
        label: 'Text Color',
        options: {
          presetColors: standardPresetColors
        }
      },
      bgColor: {
        type: 'color',
        label: 'Background Color',
        def: '#FFF',
        options: {
          presetColors: standardPresetColors
        }
      },
      cardBorderColor: {
        type: 'color',
        label: 'Border Color for Product Cards',
        def: 'transparent',
        options: {
          presetColors: standardPresetColors
        }
      },
      outerBorderColor: {
        type: 'color',
        label: 'Border Color for Product Card Grid Tiles',
        def: 'transparent',
        options: {
          presetColors: standardPresetColors
        }
      },
      titleFontSize: {
        type: 'string',
        label: 'Title font-size'
      },
      titleFontFamily: {
        type: 'string',
        label: 'Title font-family'
      },
      titleFontWeight: {
        type: 'string',
        label: 'Title font-weight'
      },
      titleClassName: {
        type: 'string',
        label: 'Class to apply to title'
      },
      showDivider: {
        type: 'boolean',
        label: 'Show section divider with title'
      },
      showPDPLink: {
        type: 'boolean',
        label: 'Always show link to PDP'
      },
      pdpLinkText: {
        type: 'string',
        label: 'Text for PDP Link',
        def: 'Learn more',
        requiredIf: {
          showPDPLink: true
        }
      },
      gridType: {
        type: 'select',
        label: 'Choose the number of products in a row, or flex',
        def: '3',
        choices: [
          { label: '4', value: '4' },
          { label: '3', value: '3' },
          { label: '2', value: '2' },
          { label: '1', value: '1' },
          { label: 'flex', value: 'flex'}
        ]
      },
      showProductCardImageAs: {
        type: 'select',
        label: 'Product Card Image Type',
        help: 'How product image is displayed on product card',
        def: 'primary-image',
        choices: [
          {label: 'no image', value: 'no-image'},
          {label: 'primary image only', value: 'primary-image'},
          {label: 'carousel', value: 'carousel'},
        ]
      },
      _productlines: {
        type: 'relationship',
        label: 'Product Lines',
        withType: 'product-line',
        withRelationships: ['_images'],
        builders: {
          project: {
            title: 1,
            slug: 1,
            type: 1,
            _url: 1,
            thirstiePLID: 1,
            primaryImage: 1,
            imageSpec: 1,
            shortDescription: 1,
            description: 1,
            _images: 1
          }
        }
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: ['title', 'textColor', 'bgColor', 'cardBorderColor', 'outerBorderColor', 'titleFontFamily', 'titleFontSize', 'titleFontWeight', 'titleClassName', 'showDivider', 'showProductCardImageAs', 'showPDPLink', 'pdpLinkText', 'gridType', '_productlines']
      }
    }
  }
};