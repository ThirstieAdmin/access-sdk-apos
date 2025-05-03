import { initApp } from '@thirstie/ecomm-vue';

/* boilerplate for vuejs */
globalThis.__VUE_PROD_DEVTOOLS__ = process.env.NODE_ENV === 'development';
globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = process.env.NODE_ENV === 'development';
globalThis.__VUE_OPTIONS_API__ = false;

export default () => {
  // Your own project level JS may go here
  const {
    primaryColor, secondaryColor, primaryContrastingColor, secondaryContrastingColor,
    brandLogo, brandLogoAltText, supportEmail
  } = window.thData;

  const thirstieAppConfig = {
    APIKEY: window.thData.k,
    MAPSKEY: window.thData.m,
    environment: window.thData.e,
    experimental: false,
    primaryColor,
    secondaryColor,
    primaryContrastingColor,
    secondaryContrastingColor,
    brandLogo,
    brandLogoAltText,
    supportEmail
  };

  initApp(thirstieAppConfig);
};
