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
        fields: ['title', 'textColor', '_productlines']
      }
    }
  }
};