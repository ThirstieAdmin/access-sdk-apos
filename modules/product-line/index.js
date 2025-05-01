import ThirstieClient from '@thirstie/thirstieclient';



/**
 * icons: https://github.com/apostrophecms/apostrophe/blob/main/modules/%40apostrophecms/asset/lib/globalIcons.js
 */
export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Product Line',
    pluralLabel: 'Product Lines',
    shortcut: 'L'
  },
  init(self) {
    self.apos.adminBar.add('thirstie-admin-menu-toggle', 'ThirstieSync', false, {
      contextUtility: true,
      tooltip: 'Toggle Thirstie Menu',
      icon: 'binoculars-icon'
    });

    self.apos.doc.addContextOperation({
      context: 'update',
      action: 'thirstie-productline-sync',
      label: 'Sync Product Line with Thirstie',
      type: 'event'
    });
  },
  icons: {
    'sync-icon': 'Refresh'
  },
  apiRoutes(self) {
    // TODO: could this be moved into the init for the products page? and enabled only for admin users?
    return {
      get: {
        async synchronize(req) {

          console.log("DBG >>>>>>> synchronize", req.data.global?.thirstieAPIKey);
          const apiConfig = {
            env:  req.data.global?.thirstieEnvironment || 'dev',
            initState: {}
          };
          const thirstieClient = new ThirstieClient({
            apiKey: req.data.global?.thirstieAPIKey,
            mapsKey: req.data.global?.thirstieMapsKey,
            apiConfig
          });
          const response = await thirstieClient.dispatch('fetchProductListing');
          const plResponse = response?.catalogProductLines;
          // TODO: sort into matched / unmatched
          // - add ui to trigger creating new products, link to edit for others
          const products = await self.find(req, {thirstiePLID: { $eq: "1831"}}).toArray();
          console.log("DBG PRODUCTS >>", products[0]?._id, products[0]?.thirstiePLID, products[0]?.slug);
          return { products };
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