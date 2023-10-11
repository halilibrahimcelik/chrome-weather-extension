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
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: ["IBM Plex Mono", "sans-serif"].join(","),
        },
      }),
    [mode]
  );

  const contextValue = {
    toggleColorMode: colorMode.toggleColorMode,
  };
  return (
    <MainContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </MainContext.Provider>
  );
}
