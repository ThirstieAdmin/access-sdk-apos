export default {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Recipe Page',
    pluralLabel: 'Recipe Pages',
    perPage: 12
  },
  fields: {
    add: {
      subTitle: {
        type: 'string',
        label: 'Subtitle',
        required: false
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['title', 'subTitle']
      }
    }
  }
};