import "@fontsource/ibm-plex-mono/300.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/700.css";
import CityCard from "./components/CityCard";
import DarkMode from "./components/DarkMode";
import CardList from "./components/CardList";
import SearchForm from "./components/SearchForm";
import { useMainContext } from "./context/MainContext";
import { useEffect } from "react";
import "./utils/api";
import { AnimatePresence } from "framer-motion";
const App = () => {
  const { cityList, setCityList, setUnit, homeCity } = useMainContext();
  useEffect(() => {
    chrome.storage.local.get(
      ["cityList", "tempScale", "unit", "homeCity"],
      (res) => {
        const sortedCityList = res.cityList?.sort(
          (a: any, b: any) => a.order > b.order
        );

        setCityList(sortedCityList);
        setUnit(res.tempScale);
        if (res.cityList && res.cityList.length > 0) {
          const homecityTemp =
            res.cityList[0]?.main?.temp &&
            Math.round(res.cityList[0]?.main?.temp);
          const homecityUnit = res.tempScale === "metric" ? "°C" : "°F";
          const homecityWeather = res.cityList[0]?.weather[0].main;
          if (homecityWeather === "Clear") {
            chrome.action.setIcon({
              path: {
                "16": "/icon/sun-16_x_16.png",
                "32": "/icon/sun-32_x_32.png",
                "48": "/icon/sun-48_x_48.png",
                "96": "/icon/sun-96_x_96.png",
                "128": "/icon/sun-128_x_128.png",
              },
            });
          } else if (homecityWeather === "Clouds") {
            chrome.action.setIcon({
              path: {
                "16": "icon/clouds-16_x_16.png",
                "32": "icon/clouds-32_x_32.png",
                "48": "icon/clouds-48_x_48.png",
                "96": "icon/clouds-96_x_96.png",
                "128": "icon/clouds-128_x_128.png",
              },
            });
          } else if (
            homecityWeather === "Rain" ||
            homecityWeather === "Drizzle"
          ) {
            chrome.action.setIcon({
              path: {
                "16": "/icon/storm-16_x_16.png",
                "32": "/icon/storm-32_x_32.png",
                "48": "/icon/storm-48_x_48.png",
                "96": "/icon/storm-96_x_96.png",
                "128": "/icon/storm-128_x_128.png",
              },
            });
          }
          chrome.action.setBadgeText({
            text: `${homecityTemp?.toString()} ${homecityUnit?.toString()}`,
          });
        }
      }
    );
  }, []);

  return (
    <>
      <DarkMode />
      <main className="max-h-[400px] min-w-[340px] overflow-auto">
        <SearchForm />
        <CardList>
          <AnimatePresence>
            {cityList?.map((city, index) => {
              return <CityCard key={city.id} index={index} info={city} />;
            })}
          </AnimatePresence>
        </CardList>
      </main>
    </>
  );
};

export default App;
