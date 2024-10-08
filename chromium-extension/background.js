chrome.contextMenus.create({
  id: "run-gallery",
  title: "this-page-as-a-gallery",
  contexts: ["page", "image"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      files: ["script.js"],
    })
    .then(() => {
      console.log("WELCOME");
    })
    .catch((error) => {
      console.error("Error!! " + error);
    });
});
