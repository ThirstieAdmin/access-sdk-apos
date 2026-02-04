export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Product Line Page',
    pluralLabel: 'Product Line Pages',
    perPage: 12
  },
  fields: {
    add: {
      titleOverride: {
        type: 'string',
        label: 'Product Listing Page Title',
        help: 'Override the default title ("Products") on the product line page'
      },
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
      linkText: {
        type: 'string',
        label: 'Text for link to PDP',
        def: 'Learn more'
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
      },
      hideBreadcrumb: {
        type: 'boolean',
        label: 'Hide Breadcrumb',
        help: 'Hide the breadcrumb navigation on the product pages',
        def: false
      },
      hideRelatedProductsPDP: {
        type: 'boolean',
        label: 'Hide related products on PDP',
        help: 'Add related products in Product Line page',
        def: false
      },
      hideRecipesPDP: {
        type: 'boolean',
        label: 'Hide related recipes on PDP',
        help: 'Hide related recipes on Product Line page',
        def: false
      }
    },
    group: {
      basics: {
        label: "Product Listing Page",
        fields: ['titleOverride', 'hideBreadcrumb', 'ctaLabel', 'locationLabel', 'unavailableLabel', 'showProductCardImageAs', 'linkText']
      },
      productDetail: {
        label: 'Product Detail Pages',
        fields: ['showPDPImageAs', 'hideRelatedProductsPDP', 'hideRecipesPDP']
      }
    }
  }
};