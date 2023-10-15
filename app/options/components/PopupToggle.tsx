import React, { useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useMainContext } from "@/app/popup/context/MainContext";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
type Props = {};

function PopupToggle({}: Props) {
  const { popup, setPopup } = useMainContext();
  console.log(popup);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPopup(e.target.checked);
    chrome.storage.local.set({ popup: e.target.checked });
  };
  useEffect(() => {
    chrome.storage.local.get(["popup"], (res) => {
      console.log(res.popup);
      setPopup(res.popup);
    });
  }, []);
  return (
    <Grid container pb={2}>
      <Grid item xs={3}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                color="secondary"
                checked={popup}
                onChange={handleChange}
              />
            }
            label={popup ? "Show" : "Hide"}
          />
        </FormGroup>
      </Grid>
      <Grid xs={12}>
        <Typography
          variant="body2"
          component={"p"}
          fontSize={11}
          sx={{ color: "primary.primary" }}
        >
          change visibility of the popup when the page load.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PopupToggle;
