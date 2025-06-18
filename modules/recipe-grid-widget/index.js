export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Thirstie Recipe Grid',
    icon: 'cocktail'
  },
  // see list of icons in node_modules/@apostrophecms/vue-material-design-icons
  // or https://pictogrammers.com/library/mdi/
  icons: {
    cocktail: 'GlassCocktail'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Title'
      },
      subTitle: {
        type: 'string',
        label: 'Subtitle',
        required: false
      },
      _recipes: {
        type: 'relationship',
        label: 'Product Lines',
        withType: 'product-line',
        withRelationships: ['_images'],
        builders: {
          project: {
            title: 1,
            slug: 1,
            _url: 1,
            primaryImage: 1
          }
        }
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: [ 'title', 'subTitle', '_recipes' ]
      }
    }
  }
};