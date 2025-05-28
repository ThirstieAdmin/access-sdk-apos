const richTextOptions = {
  toolbar: [
    'styles',
    '|',
    'bold',
    'italic',
    'strike',
    'link',
    '|',
    'alignLeft',
    'alignRight',
    'alignCenter',
    'alignJustify',
    '|',
    'bulletList',
    'orderedList',
    'horizontalRule',
    'link'
  ],
  styles: [
    {
      tag: 'p',
      label: 'Paragraph (P)'
    },
    {
      tag: 'h3',
      label: 'Heading 3 (H3)'
    },
    {
      tag: 'h4',
      label: 'Heading 4 (H4)'
    }
  ],
  insert: [
    'table',
    'image'
  ]
};

const urlScheme = {
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

export default {
  fields: {
    add: {
      brandLogo: {
        type: 'url',
        label: 'Brand logo'
      },
      brandLogoAltText: {
        type: 'string',
        label: 'Alt text for brand logo'
      },
      supportEmail: {
        type: 'email',
        label: 'support@email.com'
      },
      headerNav: {
        type: 'array',
        label: 'headerNav',
        titleField: 'label',
        fields: {
          add: {
            ...urlScheme
          }
        }
      },
      footerNav: {
        type: 'array',
        label: 'footerNav',
        titleField: 'label',
        fields: {
          add: {
            ...urlScheme
          }
        }
      },
      footerTop: {
        type: 'area',
        label: 'Top Content',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': richTextOptions,
            '@apostrophecms/html': {}
          }
        }
      },
      primaryColor: {
        type: 'color',
        label: 'Primary brand color'
      },
      primaryContrastingColor: {
        type: 'color',
        label: 'Contrasting color for primary'
      },
      secondaryColor: {
        type: 'color',
        label: 'Secondary brand color'
      },
      secondaryContrastingColor: {
        type: 'color',
        label: 'Contrasting color for secondary'
      }
    },
    group: {
      brandContent: {
        label: 'Brand Content',
        fields: [ 'brandLogo', 'brandLogoAltText', 'supportEmail' ]
      },
      theme: {
        label: 'Theme',
        fields: [ 'primaryColor', 'primaryContrastingColor', 'secondaryColor', 'secondaryContrastingColor' ]
      },
      headerContent: {
        label: 'Header',
        fields: [ 'headerNav' ]
      },
      footerContent: {
        label: 'Footer',
        fields: [ 'footerTop', 'footerNav' ]
      }
    }
  }
}