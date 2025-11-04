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
      displayType: {
        type: 'select',
        label: 'Choose how to display the recipe list',
        def: 'grid',
        choices: [
          { label: 'carousel', value: 'carousel'},
          { label: 'grid', value: 'grid' }
        ]
      },
      _recipes: {
        type: 'relationship',
        label: 'Recipes',
        withType: 'recipe',
        builders: {
          project: {
            title: 1,
            description: 1,
            slug: 1,
            _url: 1,
            primaryImage: 1,
            ingredients: 1,
            directions: 1,
            extraContent: 1
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