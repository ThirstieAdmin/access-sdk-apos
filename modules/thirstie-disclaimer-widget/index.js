export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Thirstie Disclaimer Widget',
    icon: 'circle-icon'
  },
  fields: {
    add: {
      additionalText: {
        type: 'string',
        label: 'Additional text'
      },
      textColor: {
        type: 'color',
        label: 'Text Color'
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: ['additionalText', 'textColor']
      }
    }
  }
};