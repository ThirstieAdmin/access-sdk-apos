import ThirstieClient from '@thirstie/thirstieclient';

const thirstieDownloadProducts = async () => {
  try {
    const updateResponse = await fetch('/api/v1/product-line/thirstiesyncall', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await updateResponse.json();
    const products = responseData?.products;
    const success = !!products;

    return { updated: products?.length, success, data: responseData };
  } catch (err) {
    return { slug: '', success: false, data: {}};
  }
};

export default () => {
  // listener for admin clicks
  apos.bus.$on('admin-menu-click', async (name) => {
    if (name === 'thirstie-admin-menu-toggle') {
      const thAdminEl = document.getElementById('th-admin-menu');
      thAdminEl?.classList?.toggle('th-admin-nav-hidden');
    }

    if (name === 'thirstie-admin-productline-syncall') {
      apos.notify('Downloading new product lines from Thirstie', { dismiss: true });
      const r = await thirstieDownloadProducts();
      const { updated, success } = r;
      const alertType = success ? 'success' : 'error';
      apos.notify(`Downloaded ${updated} new product lines`, { dismiss: true, type: alertType });
    }
  });
};