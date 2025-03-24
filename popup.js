// This script handles the popup functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get current tab information
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    
    // You could add functionality here to check if any companies were detected
    // on the current page and update the popup UI accordingly
  });
});
