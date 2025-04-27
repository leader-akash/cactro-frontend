// Create highlight button element
const highlightButton = document.createElement('button');
highlightButton.id = 'highlight-saver-button';
highlightButton.textContent = 'Save Highlight';
highlightButton.style.display = 'none';
highlightButton.style.position = 'absolute';
highlightButton.style.zIndex = '9999';
highlightButton.style.padding = '5px 10px';
highlightButton.style.background = '#4CAF50';
highlightButton.style.color = 'white';
highlightButton.style.border = 'none';
highlightButton.style.borderRadius = '4px';
highlightButton.style.cursor = 'pointer';
highlightButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

document.body.appendChild(highlightButton);

let currentSelection = null;

// Position button near selection
function positionButton(selection) {
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  
  highlightButton.style.top = `${window.scrollY + rect.bottom + 5}px`;
  highlightButton.style.left = `${window.scrollX + rect.left}px`;
  highlightButton.style.display = 'block';
}

// Handle text selection
document.addEventListener('mouseup', (e) => {
  const selection = window.getSelection();
  
  if (selection.toString().trim().length > 0) {
    currentSelection = {
      text: selection.toString().trim(),
      url: window.location.href,
      title: document.title,
      timestamp: new Date().toISOString()
    };
    positionButton(selection);
  } else {
    highlightButton.style.display = 'none';
  }
});

// Handle button click to save highlight
highlightButton.addEventListener('click', () => {
  if (currentSelection) {
    chrome.runtime.sendMessage({
      type: 'SAVE_HIGHLIGHT',
      data: currentSelection
    });
    highlightButton.style.display = 'none';
    window.getSelection().removeAllRanges();
    currentSelection = null;
  }
});

// Close button when clicking elsewhere
document.addEventListener('mousedown', (e) => {
  if (e.target !== highlightButton) {
    highlightButton.style.display = 'none';
  }
});