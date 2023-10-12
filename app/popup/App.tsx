import "@fontsource/ibm-plex-mono/300.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/700.css";
import CityCard from "./components/CityCard";
import DarkMode from "./components/DarkMode";
import CardList from "./components/CardList";

const App = () => {
  return (
    <>
      <DarkMode />
      <CardList>
        <CityCard city="Istanbul" />
        <CityCard city="Ankara" />
      </CardList>
    </>
  );
};

export default App;
