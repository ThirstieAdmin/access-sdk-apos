// modules/theme-widget/index.js
export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Theme Settings'
  },
  init(self) {
    self.apos.template.prepend('head', 'theme-widget:customStyles');
  },
  components(self) {
    return {
      async customStyles(req, data) {}
    };
  }
};