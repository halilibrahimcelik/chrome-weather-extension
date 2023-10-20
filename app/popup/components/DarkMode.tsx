import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useMainContext } from "../context/MainContext";
import { motion } from "framer-motion";
import { FormControlLabel, Switch, styled } from "@mui/material";
import React, { useEffect } from "react";
import { OpenweatherData, fetchRequest } from "../utils/api";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
const MetricSwitch = styled(Switch)(({ theme }) => ({
  padding: 6,
  color: theme.palette.mode === "dark" ? "#000000" : "#f7fff7",
  opacity: 1,
  "& .MuiSwitch-switchBase.Mui-checked": {
    transform: "translateX(16px)",
    color: theme.palette.mode === "dark" ? "#f8f2f2" : "#d8621e",
    "& + .MuiSwitch-track": {
      backgroundColor: theme.palette.mode === "dark" ? "#d49713" : "#e9993e",
      opacity: 1,
      border: 0,
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.5,
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    opacity: 0.8,
    background: theme.palette.mode === "dark" ? "#fc8658" : "#bd5a5a",

    "&:checked": {
      background: "white",
    },
    "&:before": {
      content: '"\u2103"',
      position: "absolute",

      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
      left: 12,
    },
    "&:after": {
      content: '"\u2109"',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
      right: 10,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 17,
    height: 17,
    margin: 2,
  },
}));

const DarkMode = () => {
  const theme = useTheme();
  const [checked, setChecked] = React.useState(true);

  const {
    toggleColorMode,
    setUnit,
    cityList,
    unit,
    setLoading,
    setError,
    setCityList,
  } = useMainContext();
  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? setUnit("metric") : setUnit("imperial");

    setChecked(e.target.checked);
    const newTempScale = e.target.checked ? "metric" : "imperial";
    chrome.storage.local.set({ tempScale: newTempScale }, () => {
      setChecked(e.target.checked);
    });
  };
  useEffect(() => {
    const onlyCityNameArray = cityList?.map((city, index) => {
      return { name: city.name, order: city.order };
    });
    const onlyCityNameWithSameOrder = cityList?.map((city, index) => {
      return { city: city.name, order: index };
    });
    console.log(onlyCityNameArray);
    const test = onlyCityNameWithSameOrder?.sort(
      (a: any, b: any) => b.order - a.order
    );
    console.log(test?.map((city) => city.city));
    console.log(cityList);
    if (onlyCityNameArray && onlyCityNameArray.length > 0) {
      chrome.storage.local.set({ cityList: [] });
      setCityList([]);
    }

    chrome.storage.local.get("tempScale", (res) => {
      setUnit(res.tempScale);
      if (res.tempScale === "metric") setChecked(true);
      else setChecked(false);
    });
    let sortedArray: any[] = [];
    if (onlyCityNameArray) {
      for (const cityName of onlyCityNameArray!) {
        fetchRequest(cityName.name, unit === undefined ? "imperial" : unit)
          .then((res) => {
            setLoading(true);
            if (res.status === 404) throw new Error("City not found");
            if (res.ok) {
              setTimeout(() => {
                setLoading(false);
              }, 500);
            }
            return res.json();
          })
          .then((data: OpenweatherData) => {
            setError(null);
            sortedArray.push({ ...data, order: cityName.order });
            console.log(
              sortedArray.sort((a, b) => a.order - b.order),
              "sortedArray"
            );
            // setCityList((prev) => {
            //   if (prev) {
            //     return [...prev, { ...data, order: cityName.order }];
            //   } else {
            //     return [{ ...data, order: cityName.order }];
            //   }
            // });
            setTimeout(() => {
              chrome.storage.local.set({
                cityList: sortedArray.sort((a, b) => a.order - b.order),
              });
              setCityList(sortedArray.sort((a, b) => a.order - b.order));
            }, 700);
          })
          .catch((err) => setError(err))
          .finally(() => {
            setTimeout(() => {
              setLoading(false);
            }, 500);
          });
      }
    }
  }, [unit]);
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeIn" }}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 0,
        pt: 2,
        px: 2,
      }}
    >
      <div>
        <FormControlLabel
          control={
            <MetricSwitch
              onChange={handleUnitChange}
              checked={checked}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label={checked ? "Metric" : "Imperial"}
          sx={{ fontWeight: 700 }}
        />
      </div>
      <div className=" flex items-end gap-2 ">
        <span>Options</span>
        <SettingsSuggestIcon
          titleAccess="Options"
          sx={{ cursor: "pointer" }}
          onClick={() => chrome.runtime.openOptionsPage()}
        />
      </div>
      <div className="flex items-end justify-end">
        <span className="capitalize"> {theme.palette.mode} </span>

        <IconButton
          sx={{ ml: 1, p: 0 }}
          onClick={toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon titleAccess="Ligth Mode" />
          ) : (
            <Brightness4Icon titleAccess="Dark Mode" />
          )}
        </IconButton>
      </div>
    </Box>
  );
};
export default DarkMode;
