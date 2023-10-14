import { OpenweatherData } from "./popup/utils/api";

export interface LocalStorage {
  theme?: string;
  cityList?: string[];
  tempScale?: string;
  homeCity?: {
    name: string;
    cityInfo: OpenweatherData;
  };
  [key: string]: any;
}

export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "example",
      title: "Example",
      contexts: ["all"],
    });
  });
  chrome.storage.local.get(
    ["theme", "cityList", "tempScale"],
    (res: LocalStorage) => {
      chrome.storage.local.set({
        theme: "theme" in res ? res.theme : "light",
      });
      chrome.storage.local.set({
        cityList: "cityList" in res ? res.cityList : [],
      });
      chrome.storage.local.set({
        tempScale: "tempScale" in res ? res.tempScale : "metric",
      });
      chrome.storage.local.set({
        homeCity: "homeCity" in res ? res.homeCity?.name : "",
      });
    }
  );
});
