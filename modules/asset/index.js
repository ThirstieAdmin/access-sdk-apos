export default {
  init(self) {
    console.log(`INITIALIZING ASSET MODULE FOR ENVIRONMENT: ${process.env.THENV}`);
  },
  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        thirstie(req) {
          if (req.data.global?.useProductionKeys || process.env.THENV === 'prod') {
            req.data.thirstieEnvironment = 'prod';
            req.data.thirstieAPIKey = process.env.THAPIKEY_PROD;
            req.data.thirstieMapsKey = process.env.THMAPSKEY_PROD;
          } else {
            req.data.thirstieEnvironment = process.env.THENV || 'sandbox';
            req.data.thirstieAPIKey = process.env.THAPIKEY;
            req.data.thirstieMapsKey = process.env.THMAPSKEY;
          }
          req.data.apos_s3_key = process.env.APOS_S3_KEY;
          req.data.apos_s3_secret = process.env.APOS_S3_SECRET;
          req.data.apos_s3_region = process.env.APOS_S3_REGION;
          req.data.apos_s3_bucket = process.env.APOS_S3_BUCKET;
          req.data.copyrightYear = new Date().getFullYear();
        }
      }
    };
  }
};
