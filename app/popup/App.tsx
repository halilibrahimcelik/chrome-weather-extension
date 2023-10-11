import { useEffect } from "react";

import Button from "./components/Button";
import { API_KEY, fetchRequest } from "./utils/api";

const App = () => {
  useEffect(() => {
    console.log(fetchRequest("Ankara").);
  }, []);
  return (
    <>
      <Button />
    </>
  );
};

export default App;
