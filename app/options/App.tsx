import "../popup/style.css";
import "@fontsource/ibm-plex-mono/300.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "@fontsource/ibm-plex-mono/700.css";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CityForm from "./components/CityForm";
type Props = {};

function App({}: Props) {
  return (
    <Grid
      container
      sx={{ bgcolor: "background.default" }}
      component={motion.section}
    >
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
          <CityForm />
        </Card>
      </Grid>
    </Grid>
  );
}

export default App;
