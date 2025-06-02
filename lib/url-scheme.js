export default {
  label: {
    type: 'string',
    label: 'app:label'
  },
  urlType: {
    label: 'app:type',
    type: 'select',
    choices: [
      {
        label: 'app:page',
        value: 'page'
      },
      {
        label: 'app:customUrl',
        value: 'custom'
      }
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