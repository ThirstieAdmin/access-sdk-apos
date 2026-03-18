import { standardPresetColors } from '../../lib/presets.js';

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
        options: standardPresetColors
      },
      bgColor: {
        type: 'color',
        label: 'Background Color',
        def: '#FFF',
        options: standardPresetColors
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
      pdpLinkText: {
        type: 'string',
        label: 'Text for PDP Link',
        help: 'Shown when no location has been provided.',
        def: 'Learn more'
      },
      pdpCTAText: {
        type: 'string',
        label: 'Text for CTA to Add to Cart',
        help: 'Shown when location has been provided and item can be added',
        def: 'Add To Cart'
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
      hideDescription: {
        type: 'boolean',
        label: 'Hide description on product card (bottle size will be shown)',
        def: false
      },
      showProductType: {
        type: 'boolean',
        label: 'Show Product Type on product card',
        def: false
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
        fields: ['title', 'textColor', 'bgColor', 'cardBorderColor', 'outerBorderColor', 'titleFontFamily', 'titleFontSize', 'titleFontWeight', 'titleClassName', 'showDivider', 'gridType', '_productlines']
      },
      cardLayout: {
        label: 'Card Layout',
        fields: [ 'showProductCardImageAs', 'showProductType', 'pdpLinkText', 'pdpCTAText', 'hideDescription' ]
      }
    }
  },
  styles: {
    add: {
      cardBackgroundColor: {
        type: 'color',
        label: 'Product Card Background Color',
        selector: '.th-product-grid .th-product-grid__card',
        property: 'background-color',
        options: standardPresetColors
      },
      cardTextColor: {
        type: 'color',
        label: 'Card Text Color',
        selector: '.th-product-grid .th-product-grid__card',
        property: 'color',
        options: standardPresetColors
      },
      cardBorderRadius: {
        type: 'string',
        label: 'Card Border Radius',
        selector: '.th-product-grid .th-product-grid__card',
        property: 'border-radius',
        def: 'var(--th-border-radius, 4px)'
      },
      gridBoxBorder: {
        preset: 'border',
        label: 'Grid Item Outer Border',
        selector: '.th-product-grid .th-product-grid__item',
        property: 'border',
      },
      cardBorder: {
        preset: 'border',
        label: 'Card Inner Border',
        selector: '.th-product-grid .th-product-grid__card',
        property: 'border',
      },
      cardTextTransform: {
        type: 'select',
        label: 'Card text-transform',
        selector: 'th-product-line-selector.th-product-grid__selector',
        property: 'text-transform',
        choices: [
          { label: 'none', value: 'none' },
          { label: 'uppercase', value: 'uppercase' },
          { label: 'lowercase', value: 'lowercase' }
        ]
      },
      cardButtonBG: {
        type: 'color',
        label: 'Card button background',
        selector: 'th-product-line-selector.th-product-grid__selector',
        property: '--th-plp-btn-bg',
        options: standardPresetColors
      },
      cardButtonTextColor: {
        type: 'color',
        label: 'Card button text color',
        selector: 'th-product-line-selector.th-product-grid__selector',
        property: '--th-plp-btn-color',
        options: standardPresetColors
      },
      cardButtonBorder: {
        type: 'string',
        label: 'Card button border',
        selector: 'th-product-line-selector.th-product-grid__selector',
        property: '--th-btn-border'
      },
      titleColor: {
        type: 'color',
        label: 'Product title color',
        selector: '.th-product-grid__selector',
        property: '--th-product-line-selector__title--color',
        options: standardPresetColors
      },
      titleFontFamily: {
        type: 'string',
        label: 'Product title font-family',
        selector: '.th-product-grid__selector',
        property: '--th-product-line-selector__title--font-family'
      },
      titleFontWeight: {
        type: 'string',
        label: 'Product title font-weight',
        selector: '.th-product-grid__selector',
        property: '--th-product-line-selector__title--font-weight'
      },
      variantTextColor: {
        type: 'color',
        label: 'Text color for product variant text',
        selector: '.th-product-grid__selector',
        property: '--th-product-line-selector__variant-color',
        options: standardPresetColors
      },
      cardHeight: {
        type: 'select',
        label: 'Card description height',
        selector: 'th-product-line-selector.th-product-grid__selector',
        property: '--th-product-line-selector__height',
        choices: [
          { label: 'normal', value: 'initial'},
          { label: 'large', value: '300px'}
        ]
      }
    }
  }
};
/* TODO: add styles for buttons
- see thirstieaccess.html in thirstiejs-monorepo 
*/