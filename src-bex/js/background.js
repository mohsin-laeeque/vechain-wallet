// Background code goes here
// chrome.runtime.onClicked.addListener((/* tab */) => {
//   // Opens our extension in a new browser window.
//   // Only if a popup isn't defined in the manifest.
//   chrome.tabs.create({
//     url: chrome.runtime.getURL('www/index.html')
//   }, (/* newTab */) => {
//     // Tab opened.
//   })
// })

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'connectWallet') {
      const id = chrome.runtime.id
      sendResponse(id)
    return true;
  } else {
    console.log("Current Request: ",request);
  }
});