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
        label: 'Text Color'
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
      _productlines: {
        type: 'relationship',
        label: 'Product Lines',
        withType: 'product-line',
        builders: {
          project: {
            title: 1,
            slug: 1,
            type: 1,
            _url: 1,
            thirstiePLID: 1
          }
        }
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: ['title', 'textColor', 'showPDPLink', 'pdpLinkText', 'gridType', '_productlines']
      }
    }
  }
};