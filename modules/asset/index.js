export default {
  init(self) {
    console.log(`INITIALIZING ASSET MODULE FOR ENVIRONMENT: ${process.env.THENV}`);
  },
  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        thirstie(req) {
          req.data.isDev = (process.env.NODE_ENV !== 'production');
          req.data.thirstieEnvironment = process.env.THENV;
          req.data.thirstieAPIKey = process.env.THAPIKEY;
          req.data.thirstieMapsKey = process.env.THMAPSKEY;
          req.data.copyrightYear = new Date().getFullYear();
        }
      }
    };
  }
};
