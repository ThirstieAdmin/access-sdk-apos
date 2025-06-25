import { default as richTextOptions } from '../../lib/rich-text-options.js';
import { default as areaWidgetFullConfig } from '../../lib/area.js';

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Recipe',
    pluralLabel: 'Recipes',
    shortcut: 'R',
    perPage: 12,
    localized: false
  },
  fields: {
    add: {
      description: {
        type: 'string',
        label: 'Description',
        textarea: true
      },
      ingredients: {
        type: 'array',
        label: 'Ingredients',
        titleField: 'ingredient',
        fields: {
          add: {
            ingredient: { type: 'string', label: 'Ingredient', required: true },
            quantity: { type: 'string', label: 'quantity'}
          }
        }
      },
      directions: {
        type: 'array',
        label: 'Method',
        fields: {
          add: {
            step: {
              type: 'area',
              label: 'Step',
              options: {
                widgets: {
                  '@apostrophecms/rich-text': richTextOptions,
                  '@apostrophecms/html': {}
                }
              }
            }
          }
        }
      },
      primaryImage: {
        label: 'Primary product image',
        type: 'area',
        required: false,
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      // TODO: use relationshipReverse to expose on products: https://docs.apostrophecms.org/reference/field-types/relationship-reverse.html#relationshipreverse
      _productlines: {
        type: 'relationship',
        label: 'Product Ingredients',
        help: 'Product lines to highlight',
        withType: 'product-line',
        fields: {
          add: {
            quantity: {
              type: 'string',
              label: 'How much'
            }
          },
          group: {
            measures: {
              label: 'Measures',
              fields: [ 'quantity' ]
            }
          }
        },
        builders: {
          project: {
            title: 1,
            slug: 1,
            type: 1,
            _url: 1,
            productType: 1,
            thirstiePLID: 1
          }
        }
      },
      _images: {
        label: 'Additional images (Carousel)',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 5,
        builders: {
          project: {
            titleSortified: 0,
            highSearchText: 0,
            highSearchWords: 0,
            lowSearchText: 0,
            searchSummary: 0,
            advisoryLock: 0
          }
        }
      },
      author: {
        type: 'string',
        label: 'Author'
      },
      difficulty: {
        type: 'select',
        label: 'Difficulty',
        choices: [
          { label: 'Beginner', value: 'beginner' },
          { label: 'Intermediate', value: 'intermediate' },
          { label: 'Advanced', value: 'advanced' }
        ]
      },
      totalTime: {
        type: 'string',
        label: 'Total Time'
      },
      extraContent: {
        type: 'area',
        options: {
          widgets: areaWidgetFullConfig
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [ 'title', 'description', '_productlines', 'ingredients', 'directions' ]
      },
      images: {
        label: 'Images',
        fields: [ 'primaryImage', '_images' ]
      },
      about: {
        label: 'About',
        fields: [ 'difficulty', 'totalTime', 'author' ]
      },
      additionalContent: {
        label: 'Additional',
        fields: [ 'extraContent' ]
      }
    }
  }
}