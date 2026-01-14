const standardPresetColors = [
  '--primary-color', '--primary-contrasting-color', '--secondary-color', '--secondary-contrasting-color',
  '--th-c-alertSuccessPrimary', '--th-c-alertWarningPrimary', '--th-c-alertWrongPrimary',
  'rgb(59, 130, 246)', 'rgba(59, 130, 246, 0.5)',
  'transparent'
];

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
      titleTextColor: {
        type: 'color',
        label: 'Title text Color',
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
      },
      borderRadius: {
        type: 'string',
        label: 'Recipe Border Radius',
        help: 'Defaults to --th-border-radius'
      },
      imgHeight: {
        type: 'string',
        label: 'Recipe Image Height',
        help: 'Defaults to 416px'
      },
      showDivider: {
        type: 'boolean',
        label: 'Show section divider with title'
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
        fields: [
          'title', 'titleTextColor', 'titleFontFamily', 'titleFontSize', 'titleFontWeight', 'titleClassName',
          'textColor', 'backgroundColor', 'borderRadius', 'imgHeight',
          'showDivider', 'displayType', '_recipes'
        ]
      }
    }
  }
};