import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { OpenweatherData, fetchRequest } from "../utils/api";
import { useEffect, useRef } from "react";
import { useMainContext } from "../context/MainContext";
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import { motion } from "framer-motion";
import { Messages } from "../utils/messages";
type Props = {};

const SearchForm: React.FC<Props> = () => {
  const searchValue = useRef<HTMLInputElement>(null);
  const {
    setCityList,
    setError,
    error,
    cityList,
    setLoading,
    unit,
    setPopup,
    popup,
  } = useMainContext();
  let newArr = [];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = searchValue.current?.value as string;

    for (const cityData of cityList!) {
      if (
        cityData.name.trim().toLocaleLowerCase("tr-TR") ===
        city.trim().toLocaleLowerCase("tr-TR")
      ) {
        setError("City already exists");
        return;
      }
    }
    fetchRequest(city, unit!)
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
        setCityList((prev) => {
          if (prev) {
            return [...prev, data];
          } else {
            return [data];
          }
        });
      })
      .catch((err) => setError(err))
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  useEffect(() => {
    const cityListWithOrder = cityList?.map((city, index) => ({
      ...city,
      order: index,
    }));
    console.log(cityListWithOrder);
    chrome.storage.local.set({ cityList: cityListWithOrder });
  }, [cityList]);
  const handleOverlay = () => {
    chrome.storage.local.set({ cityList, popup });
    setPopup(!popup);

    chrome.tabs.query(
      {
        active: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id!, {
            toggle: Messages.TOGGLE_OVERLAY,
            cityList,
          });
        }
      }
    );
  };
  return (
    <Box
      component={motion.form}
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeIn" }}
      onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": {
          width: "100%",
        },
        bgcolor: "background.default",
        borderRadius: 0,
        padding: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        inputRef={searchValue}
        required
        id="outlined-error"
        label="Search City"
        type="search"
        variant="outlined"
        autoFocus={true}
        error={error ? true : false}
        helperText={error ? `${error} ` : " "}
      />
      <div className="flex justify-between items-center">
        <Button title="Overlay Popup" onClick={handleOverlay}>
          <PictureInPictureIcon
            color="primary"
            className="cursor-pointer"
            sx={{
              transition: "opacity 0.4s ease-in",
              "&:hover": { opacity: "0.5" },
            }}
          />
        </Button>
        <Button
          type="submit"
          sx={{ width: "fit-content", alignSelf: "flex-end" }}
          variant="outlined"
          endIcon={<SearchIcon />}
        >
          Search
        </Button>{" "}
      </div>
    </Box>
  );
};
SearchForm.displayName = "SearchForm";

export default SearchForm;
