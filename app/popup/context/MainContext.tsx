import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { OpenweatherData, TempScale } from "../utils/api";
type MainContextType = {
  toggleColorMode: () => void;
  cityList: OpenweatherData[] | undefined;
  setCityList: React.Dispatch<
    React.SetStateAction<OpenweatherData[] | undefined>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setUnit: React.Dispatch<React.SetStateAction<TempScale>>;
  loading: boolean;
  error: string | null;
  unit: TempScale;
};

export const MainContext = React.createContext<MainContextType>({
  toggleColorMode: () => {},
  cityList: [],
  setCityList: () => {},
  setLoading: () => {},
  setError: () => {},
  setUnit: () => {},
  loading: false,
  error: "",
  unit: "metric",
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
  const [unit, setUnit] = React.useState<TempScale>();
  const [cityList, setCityList] = React.useState<
    OpenweatherData[] | undefined
  >();
  const [error, setError] = React.useState<string | null>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  chrome.storage.local.set({ theme: mode });
  chrome.storage.local.set({ cityList });
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
          background: {
            default: mode === "light" ? "#dadada" : "#0e0c0c",
            paper: mode === "light" ? "#dadada" : "#0e0c0c",
          },
          text: {
            primary: mode === "light" ? "#b84106" : "#e6e2e2c1",
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
    cityList,
    setCityList,
    loading,
    setLoading,
    error,
    setError,
    unit,
    setUnit,
  };
  return (
    <MainContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </MainContext.Provider>
  );
}
