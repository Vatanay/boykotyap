// List of domains to detect
const domains = [
  "espressolab.com.tr",
  "dr.com.tr",
  "idefix.com",
  "demiroren.com.tr",
  "kilimmobilya.com.tr",
  "ulker.com.tr",
  "turkpetrol.com.tr",
  "milangaz.com.tr",
  "likitgaz.com.tr",
  "ihlas.com.tr",
  "etstur.com",
  "millipiyangoonline.com",
  "misli.com",
  "iddaa.com",
  "cnnturk.com",
  "milliyet.com.tr",
  "gazetevatan.com",
  "fanatik.com.tr",
  "hurriyet.com.tr",
  "hurriyetdailynews.com",
  "posta.com.tr"
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

// Function to check if current domain is in the list
function detectCompanies() {
  if (!document.body) {
    setTimeout(detectCompanies, 100);
    return;
  }
  
  const currentDomain = window.location.hostname.toLowerCase();
  
  // Check if current domain matches or is a subdomain of any domain in the list
  for (const domain of domains) {
    if (currentDomain === domain || 
        currentDomain.endsWith('.' + domain)) {
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
