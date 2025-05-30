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
    init(self) {
    // add a button to the admin bar, clicking triggers `admin-menu-click` event with name `thirstie-admin-menu-toggle`
    self.apos.adminBar.add('thirstie-admin-menu-toggle', 'ThirstieMenu', false, {
      contextUtility: true,
      tooltip: 'Toggle Thirstie Menu',
      icon: 'binoculars-icon',
      last: true
    });
  },
  extendMethods(self) {
    return {
      getShowAdminBar(_super, req) {
        if (req.user?.role !== 'admin') {
          return false;
        }
        return _super(req);
      }
    };
  }
};