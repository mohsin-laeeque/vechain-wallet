// Hooks added here have a bridge allowing communication between the Web Page and the BEX Content Script.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/dom-hooks

export default function attachDomHooks (/* bridge */) {
  /*
  bridge.send('message.to.quasar', {
    worked: true
  })
  */

  window.mutopad = {
    enable: function enable() {
      return new Promise((resolve, reject) => {
        // Send a message to the content script to enable the wallet
        window.postMessage({ type: "enable" }, "*");
  
        // Listen for the response from the content script
        window.addEventListener("message", function(event) {
          if (event.source != window || event.data.type !== "enableResolved") return;
  
          // Resolve the promise with the wallet object
          resolve(event.data.payload);
        });
      });
    },
  }
}
