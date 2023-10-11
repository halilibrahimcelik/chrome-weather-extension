import { useEffect } from "react";

import Button from "./components/Button";
import { API_KEY, fetchRequest } from "./utils/api";

const App = () => {
  useEffect(() => {
    fetchRequest("Ankara")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Button />
    </>
  );
};

export default App;
