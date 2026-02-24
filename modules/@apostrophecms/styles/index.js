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
      }
    },
    group: {
      globalStyles: {
        label: 'Global Styles',
        fields: [
          'backgroundColor',
          'primaryLineHeight',
          'borderRadius', 'buttonBorderRadius'
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
      Availability: {
        label: 'Address/Zip Entry',
        fields: ['zipEntryMinimizedBackgroundColor', 'zipEntryMinimizedTextColor']
      }
     }
  }
};
