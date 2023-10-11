import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "../App";

export const MainContext = React.createContext({
  toggleColorMode: () => {},
});

export const useMainContext = () => React.useContext(MainContext);

export default function MainContextProvider(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) {
  const [mode, setMode] = React.useState<"light" | "dark">();

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  chrome.storage.local.set({ theme: mode });
  React.useEffect(() => {
    chrome.storage.local.get("theme", (data) => {
      setMode(data.theme);
    });
  }, [mode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            light: mode === "light" ? "#7c7c7c" : "#2fff1c",
            main: mode === "light" ? "#580b0b" : "#ffffff",
            dark: "#002884",
            contrastText: "#fff",
          },
          text: {
            primary: mode === "light" ? "#b84106" : "#f3f3f3c1",
            secondary: mode === "light" ? "#b80c0c" : "#ffffff",
          },
        },

        typography: {
          fontFamily: ["IBM Plex Mono", "sans-serif"].join(","),
        },
      }),
    [mode]
  );
  //
  const contextValue = {
    toggleColorMode: colorMode.toggleColorMode,
  };
  return (
    <MainContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </MainContext.Provider>
  );
}
