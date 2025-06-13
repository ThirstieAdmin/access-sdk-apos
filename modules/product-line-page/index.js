export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Product Line Page',
    pluralLabel: 'Product Line Pages',
    perPage: 12
  },
  fields: {
    add: {
      ctaLabel: {
        type: 'string',
        label: 'CTA label',
        def: 'Add to Cart',
        help: 'Defaults to "Add to Cart"',
        required: false
      },
      locationLabel: {
        type: 'string',
        label: 'Location required label',
        help: 'Message displayed in button when the consumer has not yet entered a delivery address. "Enter Location" (default)',
        required: false
      },
      unavailableLabel: {
        type: 'string',
        label: 'Product unavailable label',
        help: 'Message displayed if product is out of stock for provided location. "Product not available" (default)',
        required: false
      },
      showLink: {
        type: 'boolean',
        label: 'Always show PDP link on product card',
        def: true
      },
      linkText: {
        type: 'string',
        label: 'Text for link to PDP',
        def: 'Learn more',
        if: {
          showLink: true
        }
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
      showPDPImageAs: {
        type: 'select',
        label: 'Product Detail Page Image Type',
        help: 'How product image is displayed on product card',
        def: 'primary-image',
        choices: [
          {label: 'primary image only', value: 'primary-image'},
          {label: 'carousel', value: 'carousel'},
        ]
      }
    },
    group: {
      productCard: {
        label: 'Product Cards',
        fields: ['ctaLabel', 'locationLabel', 'unavailableLabel', 'showProductCardImageAs', 'showLink', 'linkText']
      },
      productDetail: {
        label: 'Product Detail Page',
        fields: ['showPDPImageAs']
      }
    }
  }
};