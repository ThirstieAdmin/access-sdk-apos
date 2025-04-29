export default {
  options: {
    groups: [
      {
        name: 'media',
        label: 'Media',
        items: [
          '@apostrophecms/image',
          '@apostrophecms/file',
          '@apostrophecms/image-tag',
          '@apostrophecms/file-tag'
        ]
      }
    ]
  }, 
  extendMethods(self) {
    return {
      getShowAdminBar(_super, req) {
        console.log("DBG getShowAdminBar", req.user?.role);
        if (req.user?.role !== 'admin') {
          return false;
        }
        return _super(req);
      }
    };
  }
};