import { standardPresetColors } from '../../../lib/presets.js';

export default {
  styles: {
    add: {
      backgroundColor: {
        type: 'color',
        label: 'Page Background',
        selector: ':root',
        property: '--body-background-color',
        options: standardPresetColors
      }
    },
    group: {
      background: {
        label: 'Background',
        fields: ['backgroundColor']
      }
    }
  }
};