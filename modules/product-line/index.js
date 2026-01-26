import ThirstieClient from '@thirstie/thirstieclient';
import { default as richTextOptions } from '../../lib/rich-text-options.js';

export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Product Line',
    pluralLabel: 'Product Lines',
    shortcut: 'L',
    perPage: 12,
    localized: false
  },
  init(self) {
    // add a button to the admin bar, clicking triggers a sync with 
    self.apos.adminBar.add('thirstie-admin-productline-syncall', 'ThirstieProductSync', false, {
      contextUtility: true,
      tooltip: 'Download Thirstie Products',
      icon: 'sync-icon'
    });

    const apiConfig = {
      env:  process.env.THENV || 'dev',
      initState: {}
    };
    const thirstieClientConfig = {
      apiKey: process.env.THAPIKEY,
      mapsKey: process.env.THMAPSKEY,
      apiConfig
    };
  
    self.thirstieClient = new ThirstieClient(thirstieClientConfig);
  },
  batchOperations: {
    add: {
      thirstiesynclines: {
        label: 'Thirstie Sync',
        icon: 'sync-icon',
        messages: {
          progress: 'Downloading information from Thirstie',
          completed: 'Completed'
        },
        modalOptions: {
          title: 'Download Thirstie Products',
          description: 'This will update the selected product lines from your Thirstie configuration. Do you want to continue?',
          confirmation: 'Yes'
        },
        permission: 'edit',
        if: {
          archived: false
        }
      }
    }
  },
  icons: {
    'sync-icon': 'DownloadMultiple'
  },
  methods (self) {
    return {
      hydratePieceData (productLineData) {
        const { productLineId, imageSpec, imageUrl, name, description, productType, productTypePath, proof, abvPercent } = productLineData;
        const pieceData = {
          title: name,
          thirstiePLID: productLineId,
          imageSpec, description, productType, productTypePath, proof, abvPercent
        };

        return pieceData;
      },
      async fetchThirstieProductLines(req) {
        const apiConfig = {
          env:  process.env.THENV || 'dev',
          initState: {}
        };
        const thirstieClientConfig = {
          apiKey: process.env.THAPIKEY,
          mapsKey: process.env.THMAPSKEY,
          apiConfig
        };
      
        const thirstieClient = new ThirstieClient(thirstieClientConfig);
      
        const productListingResponse = await thirstieClient.dispatch('fetchProductListing');
        const plResponse = productListingResponse?.catalogProductLines || [];
      
        const products = await Promise.all(plResponse.map(async (productLine) => {
          const productLineId = `${productLine.productLineId}`;
          const { imageSpec, imageUrl, name, description, productType, productTypePath, proof, abvPercent } = productLine;
      
          const cmsProductLines = await self.find(req, {thirstiePLID: { $eq: productLineId}}).toArray();
          const cmsID = cmsProductLines[0]?._id;
          const cmsSlug = cmsProductLines[0]?.slug;
      
          const result = {
            productLineId,
            cmsID,
            cmsSlug,
            imageSpec,
            name,
            description,
            productType,
            proof,
            abvPercent
          };
      
          return result;
        }));
      
        return products;
      },
      async addNewProductLine(req, pieceData) {
        let newProductLine = self.newInstance();

        // Add our initial information to the object.
        newProductLine = {
          ...newProductLine,
          ...pieceData
        };

        const insertResult = await self.insert(req, newProductLine);

        return insertResult;
      }
    }
  },
  apiRoutes(self) {
    return {

      get: {
        async thirstie(req) {
          const products = await self.fetchThirstieProductLines(req);

          const unmatched = products.filter((pl) => !pl.cmsID).length;
          return { products, count: products.length, unmatched };
        }
      },

      post: {

        async thirstiesyncall(req) {
          const products = await self.fetchThirstieProductLines(req);
          const unmatched = products.filter((pl) => !pl.cmsID);

          const updated = await Promise.all(unmatched.map(async (productLine) => {
            const pieceData = self.hydratePieceData(productLine);

            const insertResult = self.addNewProductLine(req, pieceData);
            return insertResult;
          }));
          return { updated, count: updated.length, products: unmatched };
        },

        async thirstiesynclines(req) {
          const productListingResponse = await self.thirstieClient.dispatch('fetchProductListing');
          const products = productListingResponse?.catalogProductLines || [];

          // Make sure there is an `_ids` array provided.
          if (!(products?.length > 0) || !Array.isArray(req.body._ids)) {
            throw self.apos.error('invalid');
          }

          // Ensure that the req object and IDs are using the same locale
          // and mode.
          req.body._ids = req.body._ids.map(_id => {
            return self.inferIdLocaleAndMode(req, _id);
          });

          // Run the batch operation as a "job," passing the iterator function
          // as an argument to actually make the changes.
          return self.apos.modules['@apostrophecms/job'].runBatch(
            req,
            self.apos.launder.ids(req.body._ids),
            handleSyncLines,
            {
              action: 'thirstiesynclines'
            }
          );

          // The iterator function that updates each individual piece.
          async function handleSyncLines (req, id) {
            const piece = await self.findOneForEditing(req, { _id: id });

            if (!piece) {
              throw self.apos.error('notfound');
            }

            // 🪄 Do the work of resetting piece field values.
            const match = products.filter((pl) => `${pl.productLineId}` === `${piece.thirstiePLID}`);

            if (match?.length > 0) {
              const productLine = match[0];
              const pieceData = self.hydratePieceData(productLine);
              const { imageSpec, description, productType, proof, abvPercent } = pieceData;

              piece.description = description || piece.description;
              piece.productType = productType || piece.productType;
              piece.proof = proof || piece.proof;
              piece.abvPercent = abvPercent || piece.abvPercent;
              piece.imageSpec = imageSpec || piece.imageSpec;

              await self.update(req, piece);
            }
          }
        }
      }
    }
  },
  // define piece attributes
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
      altDescription: {
        type: 'area',
        label: 'Alternative Description',
        help: 'If provided, this description will be used instead of the main description on product detail pages',
        textarea: true,
        required: false,
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': richTextOptions,
            '@apostrophecms/html': {}
          }
        }
      },
      tastingNotes: {
        type: 'area',
        label: 'Tasting Notes',
        help: 'If provided, tasting notes will be shown on product detail pages',
        textarea: true,
        required: false,
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': richTextOptions,
            '@apostrophecms/html': {}
          }
        }
      },
      shortDescription: {
        type: 'string',
        label: 'Short Description',
        help: 'A brief description shown on product listings',
        max: 200,
        textarea: true,
        required: false
      },
      additionalDescription: {
        type: 'area',
        label: 'Additional Description',
        help: 'If provided, this description will be shown below the main description on product detail pages',
        textarea: true,
        required: false,
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': richTextOptions,
            '@apostrophecms/html': {}
          }
        }
      },
      productType: {
        type: 'string',
        label: 'Product Type',
        required: true
      },
      proof: {
        type: 'string',
        label: 'Proof',
        required: false
      },
      abvPercent: {
        type: 'string',
        label: 'ABV %',
        required: false
      },
      imageSpec: {
        // TODO: create custom type
        // display and save resizing
        type: 'url',
        label: 'Image Spec',
        required: false
      },
      primaryImage: {
        label: 'Primary product image',
        help: 'Override main image from Thirstie',
        type: 'area',
        required: false,
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {}
          }
        }
      },
      _images: {
        label: 'Additional images (Carousel)',
        type: 'relationship',
        withType: '@apostrophecms/image',
        max: 5,
        builders: {
          project: {
            titleSortified: 0,
            highSearchText: 0,
            highSearchWords: 0,
            lowSearchText: 0,
            searchSummary: 0,
            advisoryLock: 0
          }
        }
      },
      _productlines: {
        type: 'relationship',
        label: 'Related Products',
        help: 'Product lines to show in related products section',
        withType: 'product-line',
        ifOnlyOne: true,
        builders: {
          project: {
            title: 1,
            slug: 1,
            type: 1,
            _url: 1,
            productType: 1,
            thirstiePLID: 1
          }
        }
      },
      _recipes: {
        type: 'relationship',
        label: 'Related Recipes',
        help: 'Product lines to show in related recipes section',
        withType: 'recipe',
        ifOnlyOne: true,
        builders: {
          project: {
            _id: 1,
            title: 1,
            description: 1,
            ingredients: 1,
            directions: 1,
            primaryImage: 1,
            _images: 1,
            extraContent: 1,
            slug: 1,
            type: 1,
            _url: 1
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['thirstiePLID', 'title', 'description', 'productType', 'proof', 'abvPercent', 'imageSpec']
      },
      additionalInformation: {
        label: 'Additional Information',
        fields: ['shortDescription', 'altDescription', 'additionalDescription', 'tastingNotes']
      },
      images: {
        label: 'Images',
        fields: ['primaryImage', '_images']
      },
      relationships: {
        label: "Related Items",
        fields: ['_productlines', '_recipes']
      }
    }
  },
  // Specify which columnns to show in piece manager
  columns: {
    add: {
      thirstiePLID: {
        label: 'Thirstie PL ID'
      },
      slug: {
        label: 'slug'
      }
    },
    order: ['title', 'thirstiePLID', 'slug', 'updatedAt']
  }
};
