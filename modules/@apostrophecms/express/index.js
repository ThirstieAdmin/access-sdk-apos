export default {
  options: {
    session: {
      // If this still says `undefined`, set a real secret!
      // TODO: set from env var
      secret: process.env.THEXPRESS_SECRET
    }
  }
};
