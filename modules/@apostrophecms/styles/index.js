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
      primaryFontFamily: {
        type: 'string',
        label: 'Primary font family',
        def: 'var(--th-standard-sanserif)',
        selector: ':root',
        property: '--primary-font-family',
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
      }
    },
    group: {
      pageStyles: {
        label: 'Page Styles',
        fields: ['backgroundColor', 'primaryTextColor', 'primaryFontFamily']
      },
      typography: {
        label: 'Typography',
        fields: [
          'headingOneFontFamily', 'headingOneFontSize', 'headingOneFontColor',
          'headingTwoFontFamily', 'headingTwoFontSize', 'headingTwoFontColor',
          'headingThreeFontFamily', 'headingThreeFontSize', 'headingThreeFontColor',
          'headingFourFontFamily', 'headingFourFontSize', 'headingFourFontColor'
        ]
      }
    }
  }
};