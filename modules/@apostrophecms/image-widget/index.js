import { standardPresetColors } from '../../../lib/presets.js';

export default {
  options: {
    linkWithType: [ '@apostrophecms/any-page-type', 'product-line', 'recipe' ]
  },
  styles: {
    add: {
      margin: 'margin',
      padding: 'padding',
      imageHeight: {
        type: 'integer',
        label: 'Image Height (px)',
        unit: 'px',
        selector: 'img.th-image-widget',
        property: 'height'
      },
      zoomOnHover: {
        type: 'boolean',
        label: 'Apply zoom on hover effect',
        selector: '.th-image-widget__wrapper',
        class: 'th-image-widget__zoom'
      },
      captionPosition: {
        type: 'select',
        label: 'Caption position',
        selector: 'figcaption.th-image-widget__caption',
        property: '--th-image-widget__caption-position',
        choices: [
          { label: 'overlay', value: 'absolute' },
          { label: 'bottom', value: 'relative'}
        ]
      },
      captionBG: {
        type: 'color',
        label: 'Caption Background',
        selector: 'figcaption.th-image-widget__caption',
        property: '--th-image-widget__caption-bg',
        options: standardPresetColors
      },
      captionTextColor: {
        type: 'color',
        label: 'Caption Text Color',
        selector: 'figcaption.th-image-widget__caption',
        property: '--th-image-widget__caption-text-color',
        options: standardPresetColors
      },
      captionPadding: {
        type: 'string',
        label: 'Caption Padding',
        selector: 'figcaption.th-image-widget__caption',
        property: '--th-image-widget__caption-padding'
      },
      captionFontFamily: {
        type: 'string',
        label: 'Caption font-family',
        selector: 'figcaption.th-image-widget__caption',
        property: '--th-image-widget__caption-font-family'
      },
      captionFontSize: {
        type: 'string',
        label: 'Caption font-size',
        selector: 'figcaption.th-image-widget__caption',
        property: '--th-image-widget__caption-font-size'
      },
      captionFontWeight: {
        type: 'string',
        label: 'Caption font-weight',
        selector: 'figcaption.th-image-widget__caption',
        property: '--th-image-widget__caption-font-weight'
      },
      captionFontStyle: {
        type: 'string',
        label: 'Caption font-style',
        selector: 'figcaption.th-image-widget__caption',
        property: '--th-image-widget__caption-font-style'
      },
      captionFontAlignItems: {
        type: 'select',
        label: 'Caption flex-align',
        selector: 'figcaption.th-image-widget__caption',
        property: '--th-image-widget__caption-flex-align',
        choices: [
          { label: 'center', value: 'center' },
          { label: 'start', value: 'start' },
          { label: 'end', value: 'end' },
        ]
      },
      captionFontJustifyContent: {
        type: 'select',
        label: 'Caption justify-content',
        selector: 'figcaption.th-image-widget__caption',
        property: '--th-image-widget__caption-flex-justify',
        choices: [
          { label: 'center', value: 'center' },
          { label: 'start', value: 'flex-start' },
          { label: 'end', value: 'flex-end' },
        ]
      }
    }
  }
};
