import "../popup/style.css";
import "@fontsource/ibm-plex-mono/300.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/700.css";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import CityForm from "./components/CityForm";
import React from "react";
type Props = {};

function App({}: Props) {
  const [isOpen, setOpen] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({ open: false, Transition: Slide });

  const handleClose = () => {
    setOpen({ ...isOpen, open: false });
  };
  return (
    <>
      <Grid
        container
        sx={{ bgcolor: "background.default" }}
        component={motion.section}
      >
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={isOpen.open}
          autoHideDuration={3000}
          onClose={handleClose}
          TransitionComponent={isOpen.Transition}
        >
          <Alert
            onClose={handleClose}
            variant="filled"
            severity="success"
            sx={{ width: "100%" }}
          >
            Your Home city has been changed successfully!
          </Alert>
        </Snackbar>

        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              py: 2,
              fontWeight: 700,
              textAlign: "center",
            }}
            className="block text-2xl text-center"
          >
            Options
          </Typography>
          <Divider />
          <Card className="container  px-4 " sx={{ borderRadius: 0 }}>
            <CardContent sx={{ py: 2, px: 0 }}>
              <Typography variant="body2" component="p">
                You can change your home city and <br></br>temperature unit from
                here.
              </Typography>
            </CardContent>
            <CityForm setOpen={setOpen} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
