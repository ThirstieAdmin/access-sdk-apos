import ThirstieClient from '@thirstie/thirstieclient';

const thirstieSync = async (cfg) => {
  const apiConfig = {
    env:  cfg.e || 'dev',
    initState: {}
  };

  const thirstieClient = new ThirstieClient({ apiKey: cfg.k, mapsKey: cfg.m, apiConfig });
  thirstieClient.dispatch('fetchProductListing').then( (response) => {
    console.log("DBG response", response?.catalogProductLines);
    alert(`updated ${response?.catalogProductLines?.length} lines`);
  });
};

export default () => {
  apos.bus.$on('admin-menu-click', async (name) => {
    console.log("DBG CLICK", apos.global);
    if (name === 'thirstie-productline-sync') {
      await thirstieSync(window.thData);
    }
  });
}