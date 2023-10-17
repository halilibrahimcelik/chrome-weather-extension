import LocationCityIcon from "@mui/icons-material/LocationCity";
import { Button, FormControl, InputAdornment, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useMainContext } from "@/app/popup/context/MainContext";
import { useRef, useState, useEffect } from "react";
import { OpenweatherData, fetchRequest } from "@/app/popup/utils/api";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
type Props = {
  setOpen: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >;
    }>
  >;
};

const CityForm = ({ setOpen }: Props) => {
  const { setError, cityList, setCityList } = useMainContext();

  const cityRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLSelectElement>(null);
  const [testArr, setTestArr] = useState<[]>([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = cityRef.current?.value as string;
    const unit = unitRef.current?.value as string;

    fetchRequest(city, unit)
      .then((res) => {
        if (res.ok) setOpen({ open: true, Transition: Slide });
        return res.json();
      })
      .then((data: OpenweatherData) => {
        if (cityList && cityList.length > 0) {
          for (const cityData of cityList!) {
            if (
              cityData.name.trim().toLocaleLowerCase("tr-TR") ===
              city.trim().toLocaleLowerCase("tr-TR")
            ) {
              setError("City already exists");
              return;
            }
          }
        }

        chrome.storage.local.get(["cityList", "tempScale"], (res) => {
          if (res.cityList) {
            chrome.storage.local.set({
              cityList: [data, ...cityList!.slice(1)],
            });
          } else {
            chrome.storage.local.set({
              cityList: [data],
            });
          }
          chrome.storage.local.set({ tempScale: unit });
        });
      })
      .catch((err) => setError(err));
  };
  useEffect(() => {
    if (cityList === undefined) {
      setCityList([]);
    }
  }, []);

  return (
    <FormControl
      component={"form"}
      onSubmit={handleSubmit}
      sx={{
        py: 2,
        display: "flex !important",
        gap: "5px",
        justifyContent: "space-between !important",
        flexDirection: "row !important",
      }}
    >
      <TextField
        id="input-with-icon-textfield"
        label="Home City"
        inputMode="text"
        inputRef={cityRef}
        required
        sx={{ width: "auto", display: "inline" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationCityIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <FormControl sx={{ width: "100px" }}>
        <InputLabel id="unit-label">Unit</InputLabel>

        <Select
          required
          labelId="unit-label"
          id="label-select"
          inputRef={unitRef}
          label="Unit"
          sx={{ color: "text.primary" }}
        >
          <MenuItem value={"metric"}>°C</MenuItem>
          <MenuItem value={"imperial"}> °F </MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="outlined"
        sx={{ display: "block", width: "10%" }}
      >
        Save
      </Button>
    </FormControl>
  );
};

export default CityForm;
