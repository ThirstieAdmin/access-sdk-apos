const urlFields = {
  label: {
    type: 'string',
    label: 'app:label',
    required: true
  },
  urlType: {
    label: 'app:type',
    type: 'select',
    choices: [
      { label: 'app:page', value: 'page' },
      { label: 'app:customUrl', value: 'custom' },
      { label: 'app:submenu', value: 'submenu' }
    ]
  },
  url: {
    type: 'url',
    label: 'app:url',
    required: true,
    if: {
      urlType: 'custom'
    }
  },
  newPage: {
    type: 'boolean',
    label: 'Open links in new page',
    def: true,
    if: {
      urlType: 'custom'
    }
  },
  _page: {
    label: 'app:page',
    type: 'relationship',
    withType: '@apostrophecms/any-page-type',
    max: 1,
    builders: {
      areas: false,
      relationships: false,
      project: {
        title: 1,
        slug: 1,
        _url: 1,
        type: 1
      }
    },
    required: true,
    if: {
      urlType: 'page'
    }
  }
};


export default {
  ...urlFields,
  subMenuItems: {
    type: 'array',
    label: 'Sub menu items',
    titleField: 'label',
    if: {
      urlType: 'submenu'
    },
    fields: {
      add: {
        ...urlFields
      }
    }
  }
};