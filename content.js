// Import domains list from shared file
const domains = window.domainsList || [];

// Sayfada tespit edilen şirketleri takip etmek için set
const detectedCompanies = new Set();

// Function to extract domain from URL
function extractDomain(url) {
  try {
    // Create a URL object to parse the URL
    const urlObj = new URL(url);
    return urlObj.hostname.toLowerCase().replace(/^www\./, '');
  } catch (e) {
    // If URL parsing fails, return the original string
    return url.toLowerCase();
  }
}

// Function to check if current domain is in the list
function detectCompanies() {
  if (!document.body) {
    setTimeout(detectCompanies, 100);
    return;
  }
  
  const currentDomain = window.location.hostname.toLowerCase().replace(/^www\./, '');
  const currentFullUrl = window.location.href.toLowerCase();
  
  // Check if current domain matches any domain in the list
  for (const companyObj of domains) {
    const companyName = Object.keys(companyObj)[0];
    
    // Eğer bu şirket zaten tespit edildiyse, tekrar işleme
    if (detectedCompanies.has(companyName)) {
      continue;
    }
    
    const companyUrls = companyObj[companyName];
    
    for (const url of companyUrls) {
      const lowerUrl = url.toLowerCase();
      
      // For social media URLs, we need to check if the current URL contains the path from our list
      if (lowerUrl.includes('x.com/') || lowerUrl.includes('twitter.com/') || lowerUrl.includes('instagram.com/')) {
        // Extract the username part for comparison
        const urlParts = lowerUrl.split('/');
        const username = urlParts[urlParts.length - 1]; // Get the last part which should be the username
        
        if (username && username.length > 0 && currentFullUrl.includes('/' + username)) {
          displayNotification(companyName);
          // Record the encounter in statistics
          try {
            BoykotStats.recordEncounter(companyName);
            // Şirketi tespit edildi olarak işaretle
            detectedCompanies.add(companyName);
            console.log('[BoykotDetector] Şirket tespit edildi ve kaydedildi:', companyName);
          } catch (error) {
            console.error('[BoykotDetector] İstatistik kaydedilirken hata:', error);
          }
          return;
        }
      }
      // For regular domains
      else {
        const domainToCheck = extractDomain(lowerUrl);
        
        if (currentDomain === domainToCheck || currentDomain.endsWith('.' + domainToCheck)) {
          displayNotification(companyName);
          // Record the encounter in statistics
          try {
            BoykotStats.recordEncounter(companyName);
            // Şirketi tespit edildi olarak işaretle
            detectedCompanies.add(companyName);
            console.log('[BoykotDetector] Şirket tespit edildi ve kaydedildi:', companyName);
          } catch (error) {
            console.error('[BoykotDetector] İstatistik kaydedilirken hata:', error);
          }
          return;
        }
      }
    }
  }
}

// Function to display the notification image
function displayNotification(companyName) {
  if (document.getElementById('company-notification')) {
    return;
  }
  
  // Add CSS animation to the document if it doesn't exist yet
  if (!document.getElementById('boykot-animation-style')) {
    const style = document.createElement('style');
    style.id = 'boykot-animation-style';
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
  
  const notification = document.createElement('div');
  notification.id = 'company-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 200px;
    height: 200px;
    z-index: 999999999;
    background-image: url('${chrome.runtime.getURL('images/notification.png')}');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 10px;
    cursor: pointer;
    animation: pulse 1.5s ease-in-out infinite;
  `;
  
  // Add text banner at the bottom
  const textBanner = document.createElement('div');
  textBanner.textContent = `${companyName} boykot listesinde!`;
  textBanner.style.cssText = `
    background-color: rgba(255, 0, 0, 0.8);
    color: white;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    text-align: center;
    max-width: 180px;
    word-wrap: break-word;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    font-family: Arial, Helvetica, sans-serif;
  `;
  
  notification.appendChild(textBanner);
  
  // Add tooltip with company name
  notification.title = `Bu site ${companyName} şirketine aittir.`;
  
  // Add click event to close notification
  notification.addEventListener('click', function() {
    notification.style.display = 'none';
  });
  
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
