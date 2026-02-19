import { standardPresetColors } from '../../lib/presets.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Button CTA',
    icon: 'link-icon'
  },
  fields: {
    add: {
      ctaText: {
        type: 'string',
        label: 'Call to Action Text',
        def: 'Learn More',
        if: {
          ctaType: { $ne: 'none' }
        }
      },
      ctaType: {
        type: 'select',
        label: 'Type of Call to Action',
        choices: [
          {
            value: 'none',
            label: 'None'
          },
          {
            value: 'productDetailPage',
            label: 'Product Detail Page'
          },
          {
            value: 'pageLink',
            label: 'Page Link'
          },
          {
            value: 'externalLink',
            label: 'External Link'
          }
        ]
      },
      ctaNewPage: {
        type: 'boolean',
        label: 'Open links in new page',
        def: false,
        if: {
          ctaType: { $ne: 'none' }
        }
      },
      _ctaProductDetailPage: {
        type: 'relationship',
        label: 'Product Lines',
        withType: 'product-line',
        max: 1,
        builders: {
          project: {
            title: 1,
            slug: 1,
            type: 1,
            _url: 1,
            thirstiePLID: 1
          }
        },
        if: {
          ctaType: 'productDetailPage'
        }
      },
      ctaExternalUrl: {
        type: 'url',
        label: 'External URL',
        required: true,
        if: {
          ctaType: 'externalLink'
        }
      },
      _ctaPageLink: {
        label: 'Page Link',
        type: 'relationship',
        withType: '@apostrophecms/any-page-type',
        max: 1,
        builders: {
          areas: false,
          relationships: false,
          project: {
            title: 1,
            slug: 1,
            _url: 1,
            type: 1
          }
        },
        required: true,
        if: {
          ctaType: 'pageLink'
        }
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: [ 'ctaText', 'ctaType', 'ctaNewPage', '_ctaProductDetailPage', 'ctaExternalUrl', '_ctaPageLink' ]}
    }
  },
  styles: {
    add: {
      backgroundColor: {
        type: 'color',
        label: 'Background Color',
        help: 'Set the background color for the marquee. This will apply to the area behind the image and caption.',
        selector: '.button-widget__button',
        property: 'background-color',
        options: standardPresetColors
      },
      widgetMargin: 'margin',
      widgetPadding: 'padding',
      textColor: {
        type: 'color',
        label: 'Text Color',
        help: 'Set the text color for the button.',
        selector: '.button-widget__button',
        property: 'color',
        options: standardPresetColors
      },
      textFontFamily: {
        type: 'string',
        label: 'Text Font Family',
        selector: '.button-widget__button',
        property: 'font-family',
        def: 'var(--primary-font-family)'
      },
      buttonWidth: {
        preset: 'width',
        label: 'Button Width',
        selector: '.button-widget__button'
      },
      buttonBorder: {
        preset: 'border',
        label: 'Button Border',
        selector: '.button-widget__button'
      },
      buttonPadding: {
        preset: 'padding',
        label: 'Button Padding',
        selector: '.button-widget__button'
      },
      textFontSize: {
        type: 'range',
        label: 'Text Font Size',
        selector: '.button-widget__button',
        property: 'font-size',
        min: 12,
        max: 72,
        def: 24,
        unit: 'px'
      },
      textFontWeight: {
        type: 'select',
        label: 'Text Font Weight',
        selector: '.button-widget__button',
        property: 'font-weight',
        choices: [
          { value: '100', label: 'Thin (100)' },
          { value: '200', label: 'Extra Light (200)' },
          { value: '300', label: 'Light (300)' },
          { value: '400', label: 'Normal (400)' },
          { value: '500', label: 'Medium (500)' },
          { value: '600', label: 'Semi Bold (600)' },
          { value: '700', label: 'Bold (700)' },
          { value: '800', label: 'Extra Bold (800)' },
          { value: '900', label: 'Black (900)' }
        ]
      },
      buttonBorderRadius: {
        type: 'string',
        label: 'Button Border Radius',
        selector: '.button-widget__button',
        property: 'border-radius',
        def: '4px'
      }
    }
  }
};
