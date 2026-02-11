import apostrophe from 'apostrophe';
import { standardPresetColors } from '../../../lib/presets.js';
import { default as richTextOptions } from '../../../lib/rich-text-options.js';
import { default as urlScheme } from '../../../lib/url-scheme.js';

const thirstieEnvironment = process.env.THENV;

export default {
  fields: {
    add: {
      useProductionKeys: {
        type: 'boolean',
        label: `Use Production Keys`
      },
      siteTitle: {
        type: 'string',
        label: 'Site title'
      },
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
        label: 'Custom code -- HEAD',
        help: 'Placed in page head',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/html': {}
          }
        }
      },
      customCodeBodyStart: {
        type: 'area',
        label: 'Custom code -- BODY START',
        help: 'Placed at the beginning of the body tag',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/html': {}
          }
        }
      },
      customCodeBodyEnd: {
        type: 'area',
        label: 'Custom code -- BODY END',
        help: 'Placed at the end of the body tag',
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
      footerBrandText: {
        type: 'area',
        label: 'Brand Additional Content',
        help: "Additional content to appear in the footer above the trademark statement",
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
        help: 'This color is used as an overlay if a footer background image is set, so it should be a semi-transparent color',
        options: standardPresetColors
      },
      footerTextColor: {
        type: 'color',
        label: 'Footer text color',
        options: standardPresetColors
      },
      /* Theme settings */
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
      borderRadius: {
        type: 'string',
        label: 'General border radius',
        help: 'Defaults to 4px'
      },
      buttonBorderRadius: {
        type: 'string',
        label: 'Button border radius',
        help: 'Defaults to borderRadius(4px)'
      },
      bodyBackgroundImage: {
        type: 'area',
        label: 'Body Background Image',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
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
        options: standardPresetColors
      },
      siteBannerBackgroundColor: {
        type: 'color',
        label: 'Banner Background Color',
        help: 'Defaults to Brand Primary Contrasting Color',
        if: {
          enableSiteBanner: true
        },
        options: standardPresetColors
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
        help: 'like abc3dkdf'
      },
      typekitAPIToken: {
        type: 'string',
        label: 'Typekit API Token',
        help: 'like 03b90b08892e1b1ccd363b84150dbb71e7fcc76f'
      },
      /* Header settings */
      headerBackgroundColor: {
        type: 'color',
        label: 'Header Background Color',
        help: 'Defaults to Brand Primary Color',
        options: standardPresetColors
      },
      headerTextColor: {
        type: 'color',
        label: 'Header Text Color',
        help: 'Defaults to Brand Primary Contrasting Color',
        options: standardPresetColors
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
      ageGateLogo: {
        type: 'area',
        label: 'Age Gate Logo',
        help: 'Optional',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      ageGateButtonBG: {
        type: 'color',
        label: 'Age Gate Button Background Color',
        help: 'Defaults to transparent (--th-ag-form-btn-bg)',
        options: standardPresetColors
      },
      ageGateButtonBorder: {
        type: 'string',
        label: 'Age Gate Button Border',
        help: 'Defaults to `1px solid var(--th-c-greysMediumLightGrey)` (--th-ag-form-btn-border)'
      },
      ageGateButtonBorderRadius: {
        type: 'string',
        label: 'Age Gate Button Border Radius',
        help: 'Defaults to borderRadius(4px)'
      },
      ageGateInputBorder: {
        type: 'string',
        label: 'Age Gate Input Border',
        help: 'Defaults to 1px solid var(--th-c-greysMediumLightGrey)',
        if: {
          ageGateType: 'dob'
        }
      },
      ageGateInputBorderRadius: {
        type: 'string',
        label: 'Age Gate Input Border Radius',
        help: 'Defaults to borderRadius(4px)',
        if: {
          ageGateType: 'dob'
        }
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
        help: 'Used as a background color for the age gate. Defaults to var(--th-primary-color)',
        options: standardPresetColors
      },
      ageGateTextColor: {
        type: 'color',
        label: 'Text Color',
        options: standardPresetColors
      },
      ageGateFormInputBG: {
        type: 'color',
        label: 'Input Background Color',
        help: '(--th-ag-form-input-bg)',
        options: standardPresetColors,
        if: {
          ageGateType: 'dob'
        }
      },
      ageGateFormInputTextColor: {
        type: 'color',
        label: 'Input Text Color',
        options: standardPresetColors,
        if: {
          ageGateType: 'dob'
        }
      },
      ageGateFormBG: {
        type: 'color',
        label: 'Background for form elements',
        help: 'Use to ensure form is visible against background image (--th-ag-form-bg)',
        def: 'transparent',
        options: standardPresetColors
      },
      ageGateHideThirstieDisclaimer: {
        type: 'boolean',
        label: 'Hide Thirstie disclaimer in age gate',
        help: 'This will hide the "All sales of alcohol are fulfilled by licensed retailers on the Thirstie Network." message that appears after users pass the age gate. We recommend keeping this message visible to ensure compliance with alcohol retail regulations.'
      },
      /* General */
      locationType: {
        type: 'select',
        label: 'Delivery location type',
        def: 'stickyzip',
        choices: [
          { label: 'Sticky ZipCode', value: 'stickyzip' },
          { label: 'Address entry', value: 'address' }
        ]
      },
      locationTitle: {
        type: 'string',
        lable: 'Heading for availabilty widget',
        if: {
          locationType: 'address'
        }
      },
      locationBG: {
        type: 'color',
        label: 'Availability background',
        options: standardPresetColors
      },
      locationBorderColor: {
        type: 'color',
        label: 'Availability border color',
        options: standardPresetColors
      },
      locationTextColor: {
        type: 'color',
        label: 'Availability text color',
        options: standardPresetColors
      }
    },
    group: {
      themeBrandContent: {
        label: 'Theme & Brand Content',
        fields: [
          'brandLogo', 'brandLogoAltText', 'supportEmail',
          'primaryColor', 'primaryContrastingColor', 'secondaryColor', 'secondaryContrastingColor',
          'borderRadius', 'buttonBorderRadius',
        ]
      },
      generalSettings: {
        label: 'General Settings',
        fields: [
          'siteTitle', 'useProductionKeys',
          'typekitId', 'typekitAPIToken',
          'locationType', 'locationTitle', 'locationBG', 'locationBorderColor', 'locationTextColor'
        ]
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
        fields: [ 'footerLogo', 'footerTop', 'footerNav', 'footerBrandText', 'footerTrademarkText', 'footerBackgroundColor', 'footerTextColor', 'footerBackgroundImage', 'footerHeight' ]
      },
      ageGate: {
        label: 'Age Gate',
        fields: [
          'ageGateType', 'ageGateLogo', 'ageGateHeaderText', 'ageGateSubHeaderContent', 'ageGateFailContent',
          'ageGateButtonBG', 'ageGateButtonBorder', 'ageGateButtonBorderRadius', 'ageGateInputBorder', 'ageGateInputBorderRadius',
          'ageGateBackgroundColor', 'ageGateTextColor', 'ageGateFormInputBG', 'ageGateFormInputTextColor',
          'ageGateBackgroundImage', 'ageGateFormBG',
          'ageGateHideThirstieDisclaimer'
        ]
      },
      customCode: {
        label: 'Custom Code',
        fields: ['customCode', 'customCodeBodyStart', 'customCodeBodyEnd']
      }
    }
  }
}