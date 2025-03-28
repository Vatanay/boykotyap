// Background script for handling storage operations
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'recordEncounter') {
    // Get current stats
    chrome.storage.local.get(['boykotStats'], function(result) {
      const stats = result.boykotStats || {
        totalEncounters: 0,
        companyEncounters: {},
        lastUpdated: new Date().toISOString()
      };
      
      // Update stats
      stats.totalEncounters++;
      if (!stats.companyEncounters[request.companyName]) {
        stats.companyEncounters[request.companyName] = 0;
      }
      stats.companyEncounters[request.companyName]++;
      stats.lastUpdated = new Date().toISOString();
      
      // Save updated stats
      chrome.storage.local.set({ boykotStats: stats }, function() {
        console.log('[Background] İstatistikler güncellendi:', stats);
        sendResponse({ success: true, stats: stats });
      });
    });
    return true; // Will respond asynchronously
  }
  
  if (request.type === 'getStats') {
    chrome.storage.local.get(['boykotStats'], function(result) {
      const stats = result.boykotStats || {
        totalEncounters: 0,
        companyEncounters: {},
        lastUpdated: new Date().toISOString()
      };
      sendResponse(stats);
    });
    return true; // Will respond asynchronously
  }
  
  if (request.type === 'resetStats') {
    const defaultStats = {
      totalEncounters: 0,
      companyEncounters: {},
      lastUpdated: new Date().toISOString()
    };
    
    chrome.storage.local.set({ boykotStats: defaultStats }, function() {
      console.log('[Background] İstatistikler sıfırlandı');
      sendResponse({ success: true, stats: defaultStats });
    });
    return true; // Will respond asynchronously
  }
}); 