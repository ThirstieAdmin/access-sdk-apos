import apostrophe from 'apostrophe';
import { default as richTextOptions } from '../../../lib/rich-text-options.js';
import { default as urlScheme } from '../../../lib/url-scheme.js';

const standardPresetColors = [
  '--primary-color', '--primary-contrasting-color', '--secondary-color', '--secondary-contrasting-color',
  '--th-c-alertSuccessPrimary', '--th-c-alertWarningPrimary', '--th-c-alertWrongPrimary',
  'rgb(59, 130, 246)', 'rgba(59, 130, 246, 0.5)',
  'transparent'
];

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
        label: 'Header navigation menu items',
        titleField: 'label',
        fields: {
          add: {
            ...urlScheme,
          }
        }
      },
      navFormat: {
        type: 'select',
        label: 'Navigation Format',
        def: 'left',
        choices: [
          { label: 'Left align logo and navigation', value: 'left' },
          { label: 'Center align logo, left align navigation', value: 'center' }
        ]
      },
      navShadow: {
        type: 'select',
        label: 'Navigation bar bottom border',
        choices: [
          { label: 'None', value: 'none' },
          { label: 'Box shadow', value: 'shadow' }
        ]
      },
      navHeight: {
        type: 'select',
        label: 'Navigation bar height',
        choices: [
          { label: 'Normal (110px)', value: 'normal' },
          { label: 'Narrow (70px)', value: 'short' }
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
      footerBackgroundColor: {
        type: 'color',
        label: 'Footer Background color',
        options: {
          presetColors: standardPresetColors
        }
      },
      footerTextColor: {
        type: 'color',
        label: 'Footer text color',
        options: {
          presetColors: standardPresetColors
        }
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
        },
        options: {
          presetColors: standardPresetColors
        }
      },
      siteBannerBackgroundColor: {
        type: 'color',
        label: 'Banner Background Color',
        help: 'Defaults to Brand Primary Contrasting Color',
        if: {
          enableSiteBanner: true
        },
        options: {
          presetColors: standardPresetColors
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
      typekitId: {
        type: 'string',
        label: 'Typekit ID',
        help: 'like 03b90b08892e1b1ccd363b84150dbb71e7fcc76f'
      },
      /* Header settings */
      headerBackgroundColor: {
        type: 'color',
        label: 'Header Background Color',
        help: 'Defaults to Brand Primary Color',
        options: {
          presetColors: standardPresetColors
        }
      },
      headerTextColor: {
        type: 'color',
        label: 'Header Text Color',
        help: 'Defaults to Brand Primary Contrasting Color',
        options: {
          presetColors: standardPresetColors
        }
      },
      /* Age Gate Settings */
      ageGateType: {
        type: 'select',
        label: 'Age Gate Type',
        def: 'dob',
        help: 'Defaults to date of birth. If set to disabled, users will be asked to enter date of birth at checkout.',
        choices: [
          { label: 'Date of Birth', value: 'dob' },
          { label: 'Yes/No', value: 'yesno' },
          { label: 'Confirm', value: 'confirm' },
          { label: 'Disabled', value: 'disabled' }
        ]
      },
      ageGateHidLogo: {
        type: 'boolean',
        label: 'Hide brand logo on age gate',
        help: 'Logo is set in brand content',
        def: false
      },
      ageGateHeaderText: {
        type: 'string',
        label: 'Age Gate header message'
      },
      ageGateSubHeaderContent: {
        type: 'area',
        label: 'Age Gate extra content',
        help: 'Optional. Will be left blank if no content is provided',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': richTextOptions,
            '@apostrophecms/html': {}
          }
        }
      },
      ageGateFailContent: {
        type: 'area',
        label: 'Age Gate failed content',
        help: 'Defaults to link to responsibility.org',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': richTextOptions,
            '@apostrophecms/html': {}
          }
        }
      },
      ageGateBackgroundImage: {
        type: 'area',
        label: 'Age Gate Background Image',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      ageGateBackgroundColor: {
        type: 'color',
        label: 'Background Color',
        options: {
          presetColors: standardPresetColors
        }
      },
      ageGateTextColor: {
        type: 'color',
        label: 'Text Color',
        options: {
          presetColors: standardPresetColors
        }
      },
      ageGateFormInputBG: {
        type: 'color',
        label: 'Input Background Color',
        options: {
          presetColors: standardPresetColors
        }
      },
      ageGateFormInputTextColor: {
        type: 'color',
        label: 'Input Text Color',
        options: {
          presetColors: standardPresetColors
        }
      },
      ageGateFormBG: {
        type: 'color',
        label: 'Background for form elements',
        help: 'Use to ensure form is visible against background image',
        def: 'transparent',
        options: {
          presetColors: standardPresetColors
        }
      },
      /* General */
      bodyBackgroundColor: {
        type: 'color',
        label: 'Page body background',
        options: {
          presetColors: standardPresetColors
        }
      },
      locationType: {
        type: 'select',
        label: 'Delivery location type',
        def: 'stickyzip',
        choices: [
          { label: 'Sticky ZipCode', value: 'stickyzip' },
          { label: 'Address entry', value: 'address' }
        ]
      },
      locationBG: {
        type: 'color',
        label: 'Availability background',
        options: {
          presetColors: standardPresetColors
        }
      },
      locationBorderColor: {
        type: 'color',
        label: 'Availability border color',
        options: {
          presetColors: standardPresetColors
        }
      },
      locationTextColor: {
        type: 'color',
        label: 'Availability text color',
        options: {
          presetColors: standardPresetColors
        }
      }
    },
    group: {
      brandContent: {
        label: 'Brand Content',
        fields: [ 'brandLogo', 'brandLogoAltText', 'supportEmail', 'customCode' ]
      },
      theme: {
        label: 'Theme',
        fields: [ 'primaryFontFamily', 'primaryColor', 'primaryContrastingColor', 'secondaryColor', 'secondaryContrastingColor', 'typekitId' ]
      },
      generalContent: {
        label: 'General',
        fields: [ 'bodyBackgroundColor', 'locationType', 'locationBG', 'locationBorderColor', 'locationTextColor' ]
      },
      bannerContent: {
        label: 'Banners',
        fields: [ 'enableSiteBanner', 'siteBannerFontFamily', 'siteBannerText', 'siteBannerTextColor', 'siteBannerBackgroundColor' ]
      },
      headerContent: {
        label: 'Header',
        fields: [ 'headerNav', 'headerBackgroundColor', 'headerTextColor', 'navFormat', 'navHeight', 'navShadow' ]
      },
      footerContent: {
        label: 'Footer',
        fields: [ 'footerLogo', 'footerTop', 'footerNav', 'footerTrademarkText', 'footerBackgroundColor', 'footerTextColor', 'footerBackgroundImage', 'footerHeight' ]
      },
      ageGate: {
        label: 'Age Gate',
        fields: [
          'ageGateType', 'ageGateHidLogo', 'ageGateHeaderText', 'ageGateSubHeaderContent', 'ageGateFailContent',
          'ageGateBackgroundColor', 'ageGateTextColor', 'ageGateFormInputBG', 'ageGateFormInputTextColor',
          'ageGateBackgroundImage', 'ageGateFormBG'
        ]
      }
    }
  }
}