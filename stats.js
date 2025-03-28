// Boykot istatistiklerini yönetmek için yardımcı fonksiyonlar
const BoykotStats = {
  // İstatistikleri background script'ten al
  getStats(callback) {
    chrome.runtime.sendMessage({ type: 'getStats' }, function(response) {
      if (callback) callback(response);
      return response;
    });
  },

  // Yeni bir şirket karşılaşmasını kaydet
  recordEncounter(companyName) {
    chrome.runtime.sendMessage({
      type: 'recordEncounter',
      companyName: companyName
    }, function(response) {
      if (response && response.success) {
        console.log('[BoykotStats] İstatistikler güncellendi:', response.stats);
      }
    });
  },

  // İstatistikleri sıfırla
  resetStats(callback) {
    chrome.runtime.sendMessage({ type: 'resetStats' }, function(response) {
      if (response && response.success) {
        if (callback) callback(response.stats);
        console.log('[BoykotStats] İstatistikler sıfırlandı');
      }
    });
  }
};

// İstatistikleri diğer scriptlere kullanılabilir yap
if (typeof module !== 'undefined') {
  module.exports = { BoykotStats };
} else {
  window.BoykotStats = BoykotStats;
} 