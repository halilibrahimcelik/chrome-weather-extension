import { useState } from "react";

import Button from "./components/Button";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button />
    </>
  );
};

export default App;
