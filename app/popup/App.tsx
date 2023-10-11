import "@fontsource/ibm-plex-mono/300.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/700.css";
import CityCard from "./components/CityCard";
import DarkMode from "./components/DarkMode";

const App = () => {
  return (
    <>
      <DarkMode />
      <CityCard city="Ankara" />
    </>
  );
};

export default App;
