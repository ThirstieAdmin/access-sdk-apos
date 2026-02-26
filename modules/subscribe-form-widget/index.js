import { standardPresetColors } from '../../lib/presets.js';

export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Subscribe form',
    icon: 'list-status-icon'
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'Title/Label'
      },
      mailingListType: {
        type: 'select',
        label: 'Mailing List Service',
        choices: [
          { label: 'Mailchimp', value: 'mailchimp' }
        ]
      },
      inputPlaceHolderText: {
        type: 'string',
        label: 'Prompt Text',
        help: 'Enter input placeholder text. Defaults to "Email Address"',
        def: 'Email Address'
      },
      submitButtonText: {
        type: 'string',
        label: 'Submit Button Text',
        def: 'Subscribe',
        help: 'Defaults to "Subscribe"'
      },
      mailchimpAction: {
        type: 'string',
        label: 'Mailchimp Form Action',
        help: 'In your mailchimp form embed. This is the URL in the ACTION attribute of your form tag. Looks like https://MYMAILCHIMPBRAND.us2.list-manage.com/subscribe/post?u=b240201e41a4c0d3d92980cc4&amp;id=98c12cf77a',
        if: {
          mailingListType: 'mailchimp'
        }
      },

    },
    group: {
      content: {
        label: 'Basics',
        fields: [
          'title', 'mailingListType', 'mailchimpAction',
          'submitButtonText', 'inputPlaceHolderText'
        ]
      }
    }
  },
  styles: {
    add: {
      submitButtonBGColor: {
        type: 'color',
        label: 'Submit Button Color',
        selector: '.th-sf-input__button',
        property: 'background-color',
        options: standardPresetColors
      },
      submitButtonTextColor: {
        type: 'color',
        label: 'Submit Button Text Color',
        selector: '.th-sf-input__button',
        property: 'color',
        options: standardPresetColors
      },
      submitButtonFontFamily: {
        type: 'string',
        label: 'Submit Button Font Family',
        selector: '.th-sf__mailing-list-input',
        property: 'font-family'
      },
      submitButtonFontWeight: {
        type: 'select',
        label: 'Submit Button Text Color',
        selector: '.th-sf-input__button',
        property: 'font-weight',
        choices: [
          { value: '100', label: 'Thin (100)' },
          { value: '200', label: 'Extra Light (200)' },
          { value: '300', label: 'Light (300)' },
          { value: '400', label: 'Normal (400)' },
          { value: '500', label: 'Medium (500)' },
          { value: '600', label: 'Semi Bold (600)' },
          { value: '700', label: 'Bold (700)' },
          { value: '800', label: 'Extra Bold (800)' },
          { value: '900', label: 'Black (900)' }
        ]
      }
    }
  }
};
