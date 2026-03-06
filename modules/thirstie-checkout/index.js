export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Checkout',
    singleton: true
  },
  fields: {
    add: {
      continueButtonLabel: {
        type: 'string',
        label: 'continue-button-label',
        def: 'Continue'
      },
      completeButtonLabel: {
        type: 'string',
        label: 'complete-button-label',
        def: 'Complete Checkout'
      },
      confirmationMessage: {
        type: 'string',
        label: 'Message to show on confirmation page',
        def: 'Thank you for shopping with us!'
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: [ 'continueButtonLabel', 'completeButtonLabel', 'confirmationMessage' ]
      }
    }
  }
};
/*
https://docs.apostrophecms.org/guide/pages.html#creating-a-page-type

TODO:
- add slot content
- options: opt-in, etc

*/