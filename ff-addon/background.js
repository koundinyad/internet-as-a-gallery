browser.contextMenus.remove("run-gallery");

browser.contextMenus.create(
  {
    id: "run-gallery",
    title: "How does this page look like as a gallery?",
    contexts: ["page", "image"],
    icons: {
      16: "icons/icon-16.png",
      32: "icons/icon-32.png",
      64: "icons/icon-64.png",
    },
  },
  () => void browser.runtime.lastError
);

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "run-gallery") {
    browser.tabs
      .executeScript({
        code: "typeof copyToClipboard === 'function';",
      })
      .then((results) => {
        if (!results || results[0] !== true) {
          return browser.tabs.executeScript(tab.id, {
            file: "script.js",
          });
        }
      })
      .then(() => {
        return browser.tabs.executeScript(tab.id, {
          code,
        });
      })
      .catch((error) => {
        console.error("Failed to copy text: " + error);
      });
  }
});
