import apostrophe from 'apostrophe';
import { default as richTextOptions } from '../../../lib/rich-text-options.js';
import { default as urlScheme } from '../../../lib/url-scheme.js';


export default {
  fields: {
    add: {
      brandLogo: {
        type: 'url',
        label: 'Brand logo'
      },
      brandLogoAltText: {
        type: 'string',
        label: 'Alt text for brand logo'
      },
      customCode: {
        type: 'area',
        label: 'Custom code',
        help: 'Placed in page head',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/html': {}
          }
        }
      },
      supportEmail: {
        type: 'email',
        label: 'support@email.com'
      },
      headerNav: {
        type: 'array',
        label: 'headerNav',
        titleField: 'label',
        fields: {
          add: {
            ...urlScheme
          }
        }
      },
      navFormat:{
        type: 'select',
        label: 'Navigation Format',
        def: 'left',
        choices: [
          { label: 'Left align logo and navigation', value: 'left' },
          { label: 'Center align logo, left align navigation', value: 'center' }
        ]
      },
      /* Footer settings */
      footerLogo: {
        type: 'area',
        label: 'Footer Logo',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      footerNav: {
        type: 'array',
        label: 'footerNav',
        titleField: 'label',
        fields: {
          add: {
            ...urlScheme
          }
        }
      },
      footerTop: {
        type: 'area',
        label: 'Top Content',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': richTextOptions,
            '@apostrophecms/html': {}
          }
        }
      },
      footerTrademarkText: {
        type: 'string',
        label: 'Trademark Text',
        def: 'All rights reserved'
      },
      footerBackgroundImage: {
        type: 'area',
        label: 'Footer Background Image',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      footerHeight: {
        type: 'string',
        label: 'Footer height',
        def: '40vh'
      },
      /* Theme settings */
      primaryFontFamily: {
        type: 'string',
        label: 'Primary font family',
        def: 'Inter, system-ui, Helvetica Neue, Helvetica, Arial, sans-serif'
        //  Inter, system-ui, Avenir, Helvetica, Arial, sans-serif
        //  Nice system fonts: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      },
      primaryColor: {
        type: 'color',
        label: 'Primary brand color'
      },
      primaryContrastingColor: {
        type: 'color',
        label: 'Contrasting color for primary',
        help: 'Used for text on primaryColor background'
      },
      secondaryColor: {
        type: 'color',
        label: 'Secondary brand color'
      },
      secondaryContrastingColor: {
        type: 'color',
        label: 'Contrasting color for secondary'
      },
      /* Banner settings */
      enableSiteBanner: {
        type: 'boolean',
        label: 'Enable Site Banner',
        def: false
      },
      siteBannerText: {
        type: 'area',
        label: 'Site Banner',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'bold',
                'italic',
                'strike',
                'link',
                '|',
                'alignLeft',
                'alignRight',
                'alignCenter',
                'alignJustify',
                '|',
                'undo',
                'redo'
              ]
            }
          }
        },
        if: {
          enableSiteBanner: true
        }
      },
      siteBannerTextColor: {
        type: 'color',
        label: 'Banner Text Color',
        help: 'Defaults to Brand Primary Color',
        if: {
          enableSiteBanner: true
        }
      },
      siteBannerBackgroundColor: {
        type: 'color',
        label: 'Banner Background Color',
        help: 'Defaults to Brand Primary Contrasting Color',
        if: {
          enableSiteBanner: true
        }
      },
      siteBannerFontFamily: {
        type: 'string',
        label: 'Font family for site banners',
        help: 'Default: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        def: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        if: {
          enableSiteBanner: true
        }
      },
      /* Header settings */
      headerBackgroundColor: {
        type: 'color',
        label: 'Header Background Color',
        help: 'Defaults to Brand Primary Color'
      },
      headerTextColor: {
        type: 'color',
        label: 'Header Text Color',
        help: 'Defaults to Brand Primary Contrasting Color'
      }
    },
    group: {
      brandContent: {
        label: 'Brand Content',
        fields: [ 'brandLogo', 'brandLogoAltText', 'supportEmail', 'customCode' ]
      },
      theme: {
        label: 'Theme',
        fields: [ 'primaryFontFamily', 'primaryColor', 'primaryContrastingColor', 'secondaryColor', 'secondaryContrastingColor' ]
      },
      bannerContent: {
        label: 'Banners',
        fields: [ 'enableSiteBanner', 'siteBannerFontFamily', 'siteBannerText', 'siteBannerTextColor', 'siteBannerBackgroundColor' ]
      },
      headerContent: {
        label: 'Header',
        fields: [ 'headerNav', 'headerBackgroundColor', 'headerTextColor', 'navFormat' ]
      },
      footerContent: {
        label: 'Footer',
        fields: [ 'footerLogo', 'footerTop', 'footerNav', 'footerTrademarkText', 'footerBackgroundImage', 'footerHeight' ]
      }
    }
  }
}