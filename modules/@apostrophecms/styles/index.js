import { standardPresetColors } from '../../../lib/presets.js';

export default {
  styles: {
    add: {
      backgroundColor: {
        type: 'color',
        label: 'Page Background',
        help: 'Set the background color for the entire page. This will apply to the area behind all widgets and sections.',
        selector: ':root',
        property: '--body-background-color',
        options: standardPresetColors
      },
      primaryTextColor: {
        type: 'color',
        label: 'Text Color',
        help: 'Set the default text color for the page. This will apply to all text within widgets and sections unless overridden by a widget or section level text color.',
        selector: ':root',
        def: 'var(--primary-color, #000)',
        property: '--primary-text-color',
        options: standardPresetColors
      },
      primaryFontWeight: {
        type: 'select',
        label: 'Primary font weight',
        def: '400',
        selector: ':root',
        property: '--primary-font-weight',
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
      primaryFontFamily: {
        type: 'string',
        label: 'Primary font family',
        def: 'var(--th-standard-sanserif)',
        selector: ':root',
        property: '--primary-font-family',
      },
      primaryLineHeight: {
        type: 'string',
        label: 'Primary line height',
        def: '1.5',
        selector: ':root',
        property: '--primary-line-height',
      },
      borderRadius: {
        type: 'string',
        label: 'Global border radius',
        help: 'Sets the default border radius for elements such as buttons and cards.',
        def: '4px',
        selector: ':root',
        property: '--th-border-radius'
      },
      buttonBorderRadius: {
        type: 'string',
        label: 'Button border radius',
        help: 'Sets the border radius specifically for buttons.',
        def: '4px',
        selector: ':root',
        property: '--th-btn-border-radius'
      },
      headingOneFontFamily: {
        type: 'string',
        label: 'H1 font family',
        selector: ':root',
        property: '--th-h1-font-family',
      },
      headingOneFontSize: {
        type: 'string',
        label: 'H1 font size',
        def: '2em',
        selector: ':root',
        property: '--th-h1-font-size',
      },
      headingOneFontColor: {
        type: 'color',
        label: 'H1 font color',
        help: 'Defaults to primary font color',
        def: 'var(--primary-text-color, var(--th-c-black))',
        selector: ':root',
        property: '--th-h1-color',
        options: standardPresetColors
      },
      headingTwoFontFamily: {
        type: 'string',
        label: 'H2 font family',
        selector: ':root',
        property: '--th-h2-font-family',
      },
      headingTwoFontSize: {
        type: 'string',
        label: 'H2 font size',
        def: '1.5em',
        selector: ':root',
        property: '--th-h2-font-size',
      },
      headingTwoFontColor: {
        type: 'color',
        label: 'H2 font color',
        help: 'Defaults to primary font color',
        def: 'var(--primary-text-color, var(--th-c-black))',
        selector: ':root',
        property: '--th-h2-color',
        options: standardPresetColors
      },
      headingThreeFontFamily: {
        type: 'string',
        label: 'H3 font family',
        selector: ':root',
        property: '--th-h3-font-family',
      },
      headingThreeFontSize: {
        type: 'string',
        label: 'H3 font size',
        def: '1.25em',
        selector: ':root',
        property: '--th-h3-font-size',
      },
      headingThreeFontColor: {
        type: 'color',
        label: 'H3 font color',
        help: 'Defaults to primary font color',
        def: 'var(--primary-text-color, var(--th-c-black))',
        selector: ':root',
        property: '--th-h3-color',
        options: standardPresetColors
      },
      headingFourFontFamily: {
        type: 'string',
        label: 'H4 font family',
        selector: ':root',
        property: '--th-h4-font-family',
      },
      headingFourFontSize: {
        type: 'string',
        label: 'H4 font size',
        def: '1em',
        selector: ':root',
        property: '--th-h4-font-size',
      },
      headingFourFontColor: {
        type: 'color',
        label: 'H4 font color',
        help: 'Defaults to primary font color',
        def: 'var(--primary-text-color, var(--th-c-black))',
        selector: ':root',
        property: '--th-h4-color',
        options: standardPresetColors
      },
      zipEntryMinimizedBackgroundColor: {
        type: 'color',
        label: 'Zip entry minimized background color',
        help: 'Set the background color for the zip entry when it is in a minimized state.',
        selector: ':root',
        property: '--th-zip-entry-min-bg',
        options: standardPresetColors
      },
      zipEntryMinimizedTextColor: {
        type: 'color',
        label: 'Zip entry minimized text color',
        help: 'Set the text color for the zip entry when it is in a minimized state.',
        selector: ':root',
        property: '--th-zip-entry-min-text',
        options: standardPresetColors
      },
      cartHeaderBG: {
        type: 'color',
        label: 'Cart summary header background color',
        selector: 'th-cart-summary-drawer',
        property: '--th-cart-header-bg-color',
        options: standardPresetColors
      },
      cartHeaderColor: {
        type: 'color',
        label: 'Cart summary header text color',
        selector: 'th-cart-summary-drawer',
        property: '--th-cart-header-text-color',
        options: standardPresetColors
      },
      cartFooterBG: {
        type: 'color',
        label: 'Cart summary footer background',
        selector: 'th-cart-summary-drawer',
        property: '--th-cart-footer-bg-color',
        options: standardPresetColors
      },
      cartCTACheckoutBG: {
        type: 'color',
        label: 'Cart summary checkout button',
        selector: 'th-cart-summary-drawer',
        property: '--th-cart-cta-checkout-bg-color',
        options: standardPresetColors
      },
      cartCTACheckoutColor: {
        type: 'color',
        label: 'Cart summary checkout button text',
        selector: 'th-cart-summary-drawer',
        property: '--th-cart-cta-checkout-text-color',
        options: standardPresetColors
      },
      cartCTAContinueBG: {
        type: 'color',
        label: 'Cart summary continue button',
        selector: 'th-cart-summary-drawer',
        property: '--th-cart-cta-continue-bg-color',
        options: standardPresetColors
      },
      cartCTAContinueColor: {
        type: 'color',
        label: 'Cart summary continue button text',
        selector: 'th-cart-summary-drawer',
        property: '--th-cart-cta-continue-text-color',
        options: standardPresetColors
      },
      checkoutButtonDisabledBG: {
        type: 'color',
        label: 'Disabled button color',
        selector: 'th-checkout',
        property: '--th-checkout-button-disabled-bg',
        options: standardPresetColors
      },
      checkoutHeaderBG: {
        type: 'color',
        label: 'Checkout header background',
        selector: 'th-checkout',
        property: '--th-checkout-header-bg',
        options: standardPresetColors
      },
      checkoutHeaderTextColor: {
        type: 'color',
        label: 'Checkout header text color',
        selector: 'th-checkout',
        property: '--th-checkout-header-text-color',
        options: standardPresetColors
      },
      buttonHoverBG: {
        type: 'color',
        label: 'Hover effect button color',
        selector: ':root',
        property: '--th-btn-background-hover',
        options: standardPresetColors
      },
      buttonHoverTextColor: {
        type: 'color',
        label: 'Hover effect button text color',
        selector: ':root',
        property: '--th-btn-text-hover',
        options: standardPresetColors
      },
      buttonHoverBorder: {
        type: 'string',
        label: 'Hover effect button border',
        selector: ':root',
        property: '--th-btn-border-hover'
      },
      ageGateButtonHoverBG: {
        type: 'color',
        label: 'Age Gate hover effect  button color',
        selector: 'th-age-verification',
        property: '--th-btn-background-hover',
        options: standardPresetColors
      },
      ageGateButtonHoverTextColor: {
        type: 'color',
        label: 'Age Gate hover effect button text color',
        selector: 'th-age-verification',
        property: '--th-btn-text-hover',
        options: standardPresetColors
      },
      ageGateButtonHoverBorder: {
        type: 'string',
        label: 'Age Gate hover effect button border',
        selector: 'th-age-verification',
        property: '--th-btn-border-hover'
      },
      ageGateFormButtonTextColor: {
        type: 'color',
        label: 'Age Gate button text color',
        selector: 'th-age-verification',
        property: '--th-ag-form-btn-text-color',
        options: standardPresetColors
      },
      ageGateFormButtonBG: {
        type: 'color',
        label: 'Age Gate button background',
        selector: 'th-age-verification',
        property: '--th-ag-form-btn-bg',
        options: standardPresetColors
      },
      pdpContentTitleFontFamily: {
        type: 'string',
        label: 'PDP Content Title font-family',
        selector: '.th-pdp-description__title',
        property: 'font-family',
      },
      pdpContentTitleFontWeight: {
        type: 'select',
        label: 'PDP Content Title font-weight',
        selector: '.th-pdp-description__title',
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
      pdpContentTitleTextTransform: {
        type: 'select',
        label: 'PDP Content Title text-transform',
        selector: '.th-pdp-description__title',
        property: 'text-transform',
        choices: [
          { label: 'none', value: 'none' },
          { label: 'uppercase', value: 'uppercase' },
          { label: 'lowercase', value: 'lowercase' }
        ]
      },
      pdpContentDescriptionFontFamily: {
        type: 'string',
        label: 'PDP Descriptive Content font-family',
        selector: '.th-pdp-description__content',
        property: 'font-family',
      },
      pdpContentDescriptionFontWeight: {
        type: 'select',
        label: 'PDP Descriptive Content font-weight',
        selector: '.th-pdp-description__content',
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
      pdpContentDescriptionTextTransform: {
        type: 'select',
        label: 'PDP Descriptive Content text-transform',
        selector: '.th-pdp-description__content',
        property: 'text-transform',
        choices: [
          { label: 'none', value: 'none' },
          { label: 'uppercase', value: 'uppercase' },
          { label: 'lowercase', value: 'lowercase' }
        ]
      },
      footerHeight: {
        type: 'string',
        label: 'Footer height',
        selector: [':root', '.th-footer'],
        property: '--footer-height',
        def: '40vh'
      },
      footerTopPadding: {
        type: 'string',
        label: 'Footer top padding',
        help: 'default: 2rem',
        selector: 'footer.th-footer',
        property: 'padding-top'
      }
    },
    group: {
      globalStyles: {
        label: 'Global Styles',
        fields: [
          'backgroundColor',
          'primaryLineHeight',
          'borderRadius', 'buttonBorderRadius',
          'buttonHoverBG', 'buttonHoverTextColor', 'buttonHoverBorder'
        ]
      },
      typography: {
        label: 'Typography',
        fields: [
          'primaryTextColor', 'primaryFontFamily', 'primaryFontWeight',
          'headingOneFontFamily', 'headingOneFontSize', 'headingOneFontColor',
          'headingTwoFontFamily', 'headingTwoFontSize', 'headingTwoFontColor',
          'headingThreeFontFamily', 'headingThreeFontSize', 'headingThreeFontColor',
          'headingFourFontFamily', 'headingFourFontSize', 'headingFourFontColor'
        ]
      },
      ageGate: {
        label: 'Age Gate',
        fields: [ 'ageGateFormButtonBG', 'ageGateFormButtonTextColor', 'ageGateButtonHoverBG', 'ageGateButtonHoverTextColor', 'ageGateButtonHoverBorder' ]
      },
      Availability: {
        label: 'Address/Zip Entry',
        fields: ['zipEntryMinimizedBackgroundColor', 'zipEntryMinimizedTextColor']
      },
      productDetail: {
        label: 'Product Detail Pages',
        fields: [
          'pdpContentTitleFontFamily', 'pdpContentTitleFontWeight', 'pdpContentTitleTextTransform',
          'pdpContentDescriptionFontFamily', 'pdpContentDescriptionFontWeight', 'pdpContentDescriptionTextTransform',
        ]
      },
      footer: {
        label: 'Footer',
        fields: [ 'footerHeight', 'footerTopPadding' ]
      },
      cartSummary: {
        label: 'Cart Summary',
        fields: [ 'cartHeaderBG', 'cartHeaderColor', 'cartFooterBG', 'cartCTACheckoutBG', 'cartCTACheckoutColor', 'cartCTAContinueBG', 'cartCTAContinueColor' ]
      },
      checkout: {
        label: 'Checkout',
        fields: [ 'checkoutHeaderBG', 'checkoutHeaderTextColor', 'checkoutButtonDisabledBG' ]
      }
     }
  }
};
