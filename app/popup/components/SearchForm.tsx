import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchRequest } from "../utils/api";
import { useRef } from "react";
import { useMainContext } from "../context/MainContext";
type Props = {};

const SearchForm: React.FC<Props> = () => {
  const searchValue = useRef<HTMLInputElement>(null);
  const { setCityList, setError, error, cityList, setLoading } =
    useMainContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = searchValue.current?.value as string;

    for (const cityData of cityList!) {
      if (cityData.name.trim().toLowerCase() === city.trim().toLowerCase()) {
        setError("City already exists");
        return;
      }
    }

    fetchRequest(city)
      .then((data) => {
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
        setLoading(false);
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
