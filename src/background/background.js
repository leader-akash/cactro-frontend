// Initialize storage if empty
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['highlights'], (result) => {
      if (!result.highlights) {
        chrome.storage.local.set({ highlights: [] });
      }
    });
  });
  
  // Handle messages from content script and popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'SAVE_HIGHLIGHT') {
      chrome.storage.local.get(['highlights'], (result) => {
        const highlights = result.highlights || [];
        const newHighlight = {
          id: crypto.randomUUID(),
          ...request.data
        };
        chrome.storage.local.set({
          highlights: [...highlights, newHighlight]
        });
      });
    }
    
    if (request.type === 'GET_HIGHLIGHTS') {
      chrome.storage.local.get(['highlights'], (result) => {
        sendResponse(result.highlights || []);
      });
      return true; // Required for async sendResponse
    }
    
    if (request.type === 'DELETE_HIGHLIGHT') {
      chrome.storage.local.get(['highlights'], (result) => {
        const highlights = result.highlights || [];
        const updatedHighlights = highlights.filter(h => h.id !== request.id);
        chrome.storage.local.set({
          highlights: updatedHighlights
        });
        sendResponse(updatedHighlights);
      });
      return true;
    }
  });