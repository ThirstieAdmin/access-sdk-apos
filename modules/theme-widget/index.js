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
  },
  helpers(self) {
    return {
      convertPreset(color) {
        let result = color;
        if (color?.startsWith('--')) {
          result = `var(${color})`;
        }
        return result;
      },
      calcHeaderHeight(data, adminUserAdjustment) {
        let headerHeight = 0;
        if(data?.global?.navHeight === 'short') {
          headerHeight = 70;
        } else {
          headerHeight = 110;
        }
        if(data?.global?.enableSiteBanner) {
          headerHeight += 48;
        }
        if(data?.user) {
          headerHeight += adminUserAdjustment;
        }
        return headerHeight;
      },
      percentString(txtValue, precision) {
        const abv = parseFloat(txtValue).toFixed(precision || 1);
        return txtValue ? `${abv}%` : '';
      },
      decimalString(txtValue, precision = 1) {
        let result = txtValue;
        try {
          result = parseFloat(txtValue).toFixed(precision);
        } catch (error) {
          return result;
        }
        return txtValue ? `${result}` : '';
      }
    }
  }
};
