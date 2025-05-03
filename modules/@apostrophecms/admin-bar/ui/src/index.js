export default () => {
  const updateAdminBar = () => {
    // Function to insert nav element
    function addNavElement() {
      const navElement = document.querySelector('#apos-admin-bar');
      console.log("navElement", navElement);
    }
    addNavElement();
  };

  // Wrap the script in apos.util.onReady to refire when the editing
  // state changes
  apos.util.onReady(updateAdminBar);
};