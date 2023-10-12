import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
type Props = {};

const SearchForm: React.FC<Props> = () => {
  return (
    <Box
      component={"form"}
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
        required
        id="outlined-error"
        label="Search City"
        type="search"
        variant="outlined"
        autoFocus={true}
        error={false}
        helperText="Please enter a city name"
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
