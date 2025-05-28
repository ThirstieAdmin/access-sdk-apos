import { initApp } from '@thirstie/ecomm-vue';

/* boilerplate for vuejs */
globalThis.__VUE_PROD_DEVTOOLS__ = process.env.NODE_ENV === 'development';
globalThis.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = process.env.NODE_ENV === 'development';
globalThis.__VUE_OPTIONS_API__ = false;

export default () => {
  // Initialize Thirstie SDK
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
    supportEmail,
    routes: {
      checkout: '/checkout',
      shopping: '/'
    },
  };

  initApp(thirstieAppConfig);

  // Add site helper functions, listeners, etc
  // TODO: update aria elements
  const thOverlayBtns = document.querySelectorAll('.th-overlay-btn');
  const thOverlay = document.querySelector('.th-overlay');
  
  [].forEach.call(thOverlayBtns, (btn) => {
    btn.addEventListener('change', function() {
      if (!btn.checked) {
        document.body.classList.remove('noscroll');
        thOverlay.setAttribute('aria-hidden', true);
      } else {
        document.body.classList.add('noscroll');
        thOverlay.setAttribute('aria-hidden', false);
        thOverlay.scrollTop = 0;
      }
    });
  });
};
