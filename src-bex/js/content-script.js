// Content script content goes here or in activatedContentHooks (use activatedContentHooks if you need a variable
// accessible to both the content script and inside a hook

// Listen for the window.thor.enable() method call
window.addEventListener("message", function(event) {
    if (event.source != window || event.data.type !== "enable") return;
    // Call the enableThor() function and send the response back to the caller
    chrome.runtime.sendMessage({ type: "connectWallet" }, response => {
      if (chrome.runtime.lastError) {
        console.error("Error connecting wallet:", chrome.runtime.lastError.message);
        return;
      }
      const wallet = response;
      event.source.postMessage({ type: "enableResolved", payload: wallet }, "*");
    });
  });