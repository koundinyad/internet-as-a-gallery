browser.menus.create({
  id: "context-menu",
  title: "View this page as a gallery",
  contexts: ["page"],
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "context-menu") {
    // Handle the click event here
    // `info` object contains information about the context menu click, e.g., info.pageUrl, info.linkUrl, etc.
    // `tab` object contains information about the current tab, e.g., tab.id, tab.url, etc.
    console.log("Context menu item clicked!");
  }
});
