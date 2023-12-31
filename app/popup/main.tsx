import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.css";
import MainContextProvider from "./context/MainContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MainContextProvider>
    <App />
  </MainContextProvider>
);
