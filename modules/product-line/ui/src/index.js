export default () => {
  apos.util.onReady(() => {
    /**
     * https://docs.apostrophecms.org/guide/custom-ui.html#overriding-standard-vue-js-components-through-configuration-in-apostrophecms
     */
    const buttons = document.querySelectorAll('.th-admin-btn');
    const productButton = document.getElementById('th-admin-products');

    if (buttons && apos.modules['product-line']?.canEdit) {
      buttons.forEach( (button) => {
        const aposID = button.dataset?.aposid || '';
        const draftAposID = aposID.replace(":published", ":draft");

        button.addEventListener('click', async function () {
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
        });
      });
    }
  });
};