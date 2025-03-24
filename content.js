// List of companies to detect
const companies = [
  'espressoLab',
  'd&r',
  'idefix',
  'demiron',
  'kilim mobilya',
  'ülker',
  'türk petrol',
  'milangaz',
  'likitgaz',
  'ihlas',
  'ets tur',
  'milli piyango',
  'misli',
  'iddaa',
  'cnn türk'
];

// Function to normalize text for comparison
function normalizeText(text) {
  return text.toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
}

// Function to check if any company name exists in the page content or domain
function detectCompanies() {
  if (!document.body) {
    setTimeout(detectCompanies, 100);
    return;
  }
  
  const bodyText = document.body.innerText.toLowerCase();
  const currentUrl = window.location.href.toLowerCase();
  const currentDomain = window.location.hostname.toLowerCase();
  
  const normalizedDomain = normalizeText(currentDomain);
  
  // Check domain first
  for (const company of companies) {
    const normalizedCompany = normalizeText(company);
    
    if (normalizedDomain.includes(normalizedCompany) || 
        normalizedDomain === normalizedCompany ||
        normalizedDomain.startsWith(normalizedCompany + '.') ||
        normalizedDomain.endsWith('.' + normalizedCompany)) {
      displayNotification();
      return;
    }
  }
  
  // Check URL as well
  const normalizedUrl = normalizeText(currentUrl);
  for (const company of companies) {
    const normalizedCompany = normalizeText(company);
    if (normalizedUrl.includes(normalizedCompany)) {
      displayNotification();
      return;
    }
  }
  
  // Check page content
  for (const company of companies) {
    const normalizedCompany = normalizeText(company);
    const normalizedBodyText = normalizeText(bodyText);
    
    if (normalizedBodyText.includes(normalizedCompany)) {
      displayNotification();
      return;
    }
  }
}

// Function to display the notification image
function displayNotification() {
  if (document.getElementById('company-notification')) {
    return;
  }
  
  const notification = document.createElement('div');
  notification.id = 'company-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 200px;
    height: 200px;
    z-index: 9999;
    background-image: url('${chrome.runtime.getURL('images/notification.png')}');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  `;
  
  document.body.appendChild(notification);
}

// Run detection when page is loaded
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(detectCompanies, 500);
});

// Also run detection on DOM changes to catch dynamically loaded content
const observer = new MutationObserver(function() {
  detectCompanies();
});

// Start observing once the DOM is ready
window.addEventListener('load', function() {
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  }
});

// Initial detection attempt
detectCompanies();
