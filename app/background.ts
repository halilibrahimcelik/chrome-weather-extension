import { OpenweatherData, fetchRequest } from "./popup/utils/api";

export interface LocalStorage {
  theme?: string;
  cityList?: OpenweatherData[];
  tempScale?: string;
  homeCity?: {
    name: string;
    cityInfo: OpenweatherData;
  };
  popup?: boolean;
  [key: string]: any;
}

export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "cityName",
      title: "Add this city to wheather Card",
      contexts: ["all"],
    });
  });
  chrome.storage.local.get(
    ["theme", "cityList", "tempScale"],
    (res: LocalStorage) => {
      if (res.cityList) {
        const homecityTemp = Math.round(res.cityList[0].main.temp);
        const homecityUnit = res.tempScale === "metric" ? "°C" : "°F";

        chrome.action.setBadgeText({
          text: `${homecityTemp.toString()} ${homecityUnit?.toString()}`,
        });
      }

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
      chrome.storage.local.set({
        popup: "popup" in res ? res.popup : false,
      });
      chrome.storage.local.set({
        error: "error" in res ? res.error : null,
      });
    }
  );
  chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId === "cityName") {
      const query = event.selectionText?.toString();
      fetchRequest(query!, "metric")
        .then((res) => {
          console.log(res.status, "status");
          if (!res.ok) {
            console.log("not found");
            chrome.notifications.create("notfoundcity", {
              type: "basic",
              iconUrl: "https://img.icons8.com/emoji/48/warning-emoji.png",
              title: "Warning",
              message: "City not found please try a valid city name",
            });
            return;
          }
          return res.json();
        })
        .then((data: OpenweatherData) => {
          chrome.storage.local.get(["cityList", "error"], (res) => {
            for (const city of res.cityList!) {
              console.log(city, "city name");
              if (
                data?.name?.trim().toLocaleLowerCase("tr-TR") ===
                city?.name.trim().toLocaleLowerCase("tr-TR")
              ) {
                chrome.notifications.create("alreadyexist", {
                  type: "basic",
                  iconUrl: "https://img.icons8.com/emoji/48/warning-emoji.png",
                  title: "Warning",
                  message: "City already added to list",
                });
                return;
              }
            }
            chrome.storage.local.set({
              cityList: [...res.cityList!, data],
            });
          });
        });
    }
  });
});
