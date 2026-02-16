import { standardPresetColors } from '../../lib/presets.js';
import { default as richTextOptions } from '../../lib/rich-text-options.js';
import { default as urlScheme } from '../../lib/url-scheme.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Marquee Widget',
    icon: 'image-plus'
  },
  // see list of icons in node_modules/@apostrophecms/vue-material-design-icons
  // or https://pictogrammers.com/library/mdi/
  icons: {
    'image-plus': 'ImagePlus'
  },
  /* TODO: 
  - add title, content and CTA fields.
  - add side image option with image position (left or right) and text alignment (left, center, right) options.
  */
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Title',
        help: 'Add a title to the marquee. This will appear above the caption.'
      },
      figureStyle: {
        type: 'select',
        label: 'Figure Style',
        required: true,
        choices: [
          {
            value: 'background-image',
            label: 'Background Image'
          },
          {
            value: 'side-image-left',
            label: 'Side Image Left'
          },
          {
            value: 'side-image-right',
            label: 'Side Image Right'
          }
        ]
      },
      caption: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': richTextOptions,
            '@apostrophecms/html': {}
          }
        }
      },
      marqueeImage: {
        type: 'area',
        label: ' Marquee Image',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
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
          showCTA: { $ne: 'none' }
        }
      },
      ctaText: {
        type: 'string',
        label: 'Call to Action Text',
        def: 'Learn More',
        if: {
          showCTA: { $ne: 'none' }
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
        fields: [ 'title', 'figureStyle', 'marqueeImage', 'caption' ]
      },
      cta: {
        label: 'Call to Action',
        fields: [ 'ctaType', 'ctaNewPage', 'ctaText', '_ctaProductDetailPage', 'ctaExternalUrl', '_ctaPageLink' ]}
    }
  },
  styles: {
    add: {
      backgroundColor: {
        type: 'color',
        label: 'Background Color',
        help: 'Set the background color for the marquee. This will apply to the area behind the image and caption.',
        selector: '.marquee-widget__container',
        property: 'background-color',
        def: 'inherit',
        options: standardPresetColors
      },
      textColor: {
        type: 'color',
        label: 'Text Color',
        help: 'Set the text color for the marquee.',
        selector: '.marquee-widget__container',
        property: '--th-image-widget__caption-text-color',
        options: standardPresetColors
      },
      textFontFamily: {
        type: 'string',
        label: 'Text Font Family',
        selector: '.marquee-widget__container',
        property: '--th-image-widget__caption-font-family',
        def: 'var(--primary-font-family)'
      },
      widgetWidth: {
        preset: 'width',
        label: 'Widget Width',
        selector: '.marquee-widget__container'
      },
      widgetBorder: {
        preset: 'border',
        label: 'Widget Border',
        selector: '.marquee-widget__container'
      },
      widgetMargin: 'margin',
      widgetPadding: 'padding'
    }
  }
};

/* 
(SHIPPING IN AZ, CA, CO, CT, DC, FL, IA, ID, IL, KY, LA, MD, MN, MO, MT, NE, NV, NH, NJ, NM, ND, NY, OR, SC, VA, WA, WI, WV, WY)
OR CLICK HERE TO FIND IN STORE

font-family
*/