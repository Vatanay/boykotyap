// This script handles the popup functionality
document.addEventListener('DOMContentLoaded', function() {
  // Populate the companies list
  populateCompaniesList();
  
  // Get current tab information
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    
    // You could add functionality here to check if any companies were detected
    // on the current page and update the popup UI accordingly
  });
});

// Function to populate the companies list from the shared domains data
function populateCompaniesList() {
  const companiesList = document.getElementById('companies-list');
  
  // Make sure the domainsList is available
  if (!window.domainsList) {
    companiesList.innerHTML = '<li>Şirket listesi yüklenemedi.</li>';
    return;
  }
  
  // Clear existing list
  companiesList.innerHTML = '';
  
  // Add each company to the list
  window.domainsList.forEach(companyObj => {
    const companyName = Object.keys(companyObj)[0];
    
    // Create list item for the company
    const listItem = document.createElement('li');
    listItem.textContent = companyName;
    
    companiesList.appendChild(listItem);
  });
}
