import ThirstieClient from '@thirstie/thirstieclient';

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Product Line',
    pluralLabel: 'Product Lines',
    shortcut: 'L'
  },
  init(self) {
    self.apos.adminBar.add('thirstie-productline-sync', 'ThirstieSync', false, {
      contextUtility: true,
      tooltip: 'Sync Thirstie Products',
      icon: 'sync-icon'
    });
  },
  batchOperations: {
    add: {
      sync: {
        label: 'Sync Selected Product Lines',
        icon: 'sync-icon',
        messages: {
          progress: 'Syncing {{ type }}...',
          completed: 'Finished sync'
        },
        modalOptions: {
          title: 'Synch items with Thirstie MPL',
          description: 'Are you sure?',
          confirmationButton: 'Yes'
        },
        permission: 'edit'
      }
    }
  },
  icons: {
    'sync-icon': 'Refresh'
  },
  apiRoutes(self) {
    return {
      post: {
        sync(req) {
          if (!Array.isArray(req.body._ids)) {
            throw self.apos.error('invalid Sync request');
          }

          const apiConfig = {
            env:  process.env.THENV || 'dev',
            initState: {}
          };

          const thirstieClient = new ThirstieClient({ apiKey: process.env.THAPIKEY, mapsKey: process.env.THMAPSKEY, apiConfig });
          console.log("DBG >>>>>>>>>", req.body._ids);
          console.log("DBG vars", thirstieClient.sessionState);

          thirstieClient.dispatch('fetchProductListing').then( (response) => {
            console.log("DBG response", response?.catalogProductLines?.length);
          });
        }
      }
    }
  },
  fields: {
    add: {
      thirstiePLID: {
        type: 'string',
        label: 'Thirstie Product Line ID',
        required: true
      },
      description: {
        type: 'string',
        label: 'Description',
        textarea: true,
        required: true
      },
      primaryImage: {
        label: 'Primary product image',
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['thirstiePLID', 'title', 'description']
      },
      images: {
        label: 'Images',
        fields: ['primaryImage']
      }
    }
  }
};