export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "example",
      title: "Example",
      contexts: ["all"],
    });
  });
  chrome.storage.local.get(["theme"], (res) => {
    chrome.storage.local.set({
      theme: "theme" in res ? res.theme : "light",
    });
  });
});
