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
      primaryColor: {
        type: 'string',
        label: 'Primary brand color'
      },
      primaryContrastingColor: {
        type: 'string',
        label: 'Contrasting color for primary'
      },
      secondaryColor: {
        type: 'string',
        label: 'Secondary brand color'
      },
      secondaryContrastingColor: {
        type: 'string',
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
      }
    }
  }
}