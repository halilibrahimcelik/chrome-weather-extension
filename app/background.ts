export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "example",
      title: "Example",
      contexts: ["all"],
    });
  });
});
