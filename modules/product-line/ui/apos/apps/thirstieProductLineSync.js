import ThirstieClient from '@thirstie/thirstieclient';

const thirstieSync = async (cfg, doc) => {
  const apiConfig = {
    env:  cfg.e || 'dev',
    initState: {}
  };

  const thirstieClient = new ThirstieClient({ apiKey: cfg.k, mapsKey: cfg.m, apiConfig });
  const response = await thirstieClient.dispatch('fetchProductListing');
  
  const plResponse = response?.catalogProductLines?.filter((item) => `${item.productLineId}` === `${doc.thirstiePLID}` );
  const itemData = plResponse[0];

  /*
  abvPercent
  brandName
  containerSizes: [{…}]
  defaultProduct: {tpk: 'PBXAGKZFE',upc: '850047003003', description: null, vintage: null, containerSizeLabel: '750 mL', …}
  description: "Angel's Envy Bourbon from the cellars of master distiller Lincoln Henderson, this fine bourbon is aged for 6 years in charred oak barrels, and then further aged in ruby port casks. The end result is a silky taste that delivers flavors of caramel, fruit, chocolate, and a hint of vanilla. Brilliantly good on its own or can be enjoy with a variety cocktails."
  hasLocation: false
  imageSpec: "https://media.thirstie.cloud/products/darGyjZP61HSp978PqzJ7e{dims}.jpg"
  imageUrl: "https://media.thirstie.cloud/products/darGyjZP61HSp978PqzJ7e.jpg"
  maxPrice: "67.2900"
  minPrice: "47.6900"
  name: "Angel's Envy"
  offerCount: 30
  productCount: 1
  productLineId: 1831
  productType: "Bourbon"
  productTypePath: (3) ['Spirits', 'Whiskey', 'Bourbon']
  products: [{…}]
  proof: "86.600"
  */
  const data = {
    description: itemData.description
  };
  const updateResponse = await fetch(`/api/v1/product-line/${doc._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  // Open editing modal
  // TODO: how do we close 
  /*
  export default {
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };

  */
  const responseData = await updateResponse.json();
  const draftAposID = responseData?._id;

  if (draftAposID) {
    try {
      const pieceDocument = await apos.doc.edit({
        type: 'product-line',
        _id: draftAposID
      });
      if (pieceDocument) {
        console.log('Editing document: ', pieceDocument);
      }
    } catch (error) {
      console.error('Error editing document:', error);
    }
  }
};

export default () => {
  apos.bus.$on('admin-menu-click', async (name) => {
    if (name === 'thirstie-admin-menu-toggle') {
      const thAdminEl = document.getElementById('th-admin-menu');
      thAdminEl.classList.toggle('th-admin-nav-hidden');
    }
  });

  apos.bus.$on('thirstie-productline-sync', async (event) => {
    await thirstieSync(window.thData, event.doc);
    console.log("DBG thirstie-productline-sync event", event);
  });
}