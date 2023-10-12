import "@fontsource/ibm-plex-mono/300.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/700.css";
import CityCard from "./components/CityCard";
import DarkMode from "./components/DarkMode";
import CardList from "./components/CardList";
import SearchForm from "./components/SearchForm";

const App = () => {
  return (
    <>
      <DarkMode />
      <main className="max-h-[400px] overflow-auto">
        <SearchForm />
        <CardList>
          <CityCard city="İzmir" />
        </CardList>
      </main>
    </>
  );
};

export default App;
