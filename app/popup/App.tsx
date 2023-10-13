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
  const { cityList, setCityList } = useMainContext();

  useEffect(() => {
    chrome.storage.local.get("cityList", (res) => {
      console.log(res.cityList);
      setCityList(res.cityList);
    });
  }, []);
  return (
    <>
      <DarkMode />
      <main className="max-h-[400px] min-w-[340px] overflow-auto">
        <SearchForm />
        <CardList>
          <AnimatePresence>
            {cityList?.map((city) => {
              return <CityCard key={city.id} info={city} />;
            })}
          </AnimatePresence>
        </CardList>
      </main>
    </>
  );
};

export default App;
