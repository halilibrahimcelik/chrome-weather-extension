import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { OpenweatherData, fetchRequest } from "../utils/api";
import { useRef } from "react";
import { useMainContext } from "../context/MainContext";
type Props = {};

const SearchForm: React.FC<Props> = () => {
  const searchValue = useRef<HTMLInputElement>(null);
  const { setCityList, setError, error, cityList, setLoading } =
    useMainContext();
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

    fetchRequest(city)
      .then((res) => {
        setLoading(true);
        console.log("loading..");
        if (res.status === 404) throw new Error("City not found");
        console.log(res);
        if (res.ok) {
          setTimeout(() => {
            console.log("done");
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
  return (
    <Box
      component={"form"}
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
      <Button
        type="submit"
        sx={{ width: "fit-content", alignSelf: "flex-end" }}
        variant="outlined"
        endIcon={<SearchIcon />}
      >
        Search
      </Button>{" "}
    </Box>
  );
};
SearchForm.displayName = "SearchForm";

export default SearchForm;
