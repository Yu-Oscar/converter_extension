chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "smart-convert",
    title: "Convert selection",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "smart-convert" && info.selectionText) {
    try {
      // Dynamic import to handle ES6 modules in service worker
      const { processSelection } = await import('../core/convert.js');
      const result = await processSelection(info.selectionText);
      
      chrome.tabs.sendMessage(tab.id, {
        action: "showConversion",
        result: result,
        originalText: info.selectionText
      });
    } catch (error) {
      console.error('Conversion failed:', error);
      
      chrome.tabs.sendMessage(tab.id, {
        action: "showError",
        error: error.message || 'Conversion failed',
        originalText: info.selectionText
      });
    }
  }
});