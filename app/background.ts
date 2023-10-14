export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "example",
      title: "Example",
      contexts: ["all"],
    });
  });
  chrome.storage.local.get(["theme", "cityList", "tempScale"], (res) => {
    chrome.storage.local.set({
      theme: "theme" in res ? res.theme : "light",
    });
    chrome.storage.local.set({
      cityList: "cityList" in res ? res.cityList : [],
    });
    chrome.storage.local.set({
      tempScale: "tempScale" in res ? res.tempScale : "metric",
    });
  });
});
