import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import { OpenweatherData } from "../utils/api";
import { Divider, Grid, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import ClearIcon from "@mui/icons-material/Clear";
import { useMainContext } from "../context/MainContext";

type Props = {
  info: OpenweatherData;
  index: number;
};
const CityCard: React.FC<Props> = ({ info, index }) => {
  const { loading, cityList, setCityList, unit } = useMainContext();
  const { name, main, weather, id } = info;

  const handleDelete = (id: number) => {
    if (cityList) {
      const newCityList = cityList.filter((city) => city.id !== id);

      setCityList(newCityList);
      chrome.storage.local.set({ cityList: newCityList });
    }
  };

  return (
    <Card
      component={motion.li}
      initial={{ scale: 0.5, opacity: 0, y: -100 }}
      viewport={{ once: true, amount: 0.5 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeIn", staggerChildren: 0.4 }}
      exit={{ scale: 0.5, opacity: 0, y: -100 }}
      sx={{ minWidth: 340, borderRadius: 0 }}
    >
      <CardContent>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          {index === 0 && (
            <Grid className={`${index === 0 && "py-2"}`} item xs={12}>
              <HomeWorkRoundedIcon titleAccess="Your home city" />
            </Grid>
          )}
          <Grid item xs={6}>
            <Typography variant="h4" sx={{ color: "primary.main" }}>
              {loading ? <Skeleton /> : name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex" }}
            justifyContent={"flex-end"}
          >
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              {loading ? (
                <Skeleton width={100} />
              ) : (
                `${main.temp} ${unit === "metric" ? "°C" : "°F"}`
              )}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid
            item
            xs={8}
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",

              flexDirection: "column",
            }}
          >
            <Typography
              component={"span"}
              sx={{ color: "text.primary", fontSize: 13 }}
            >
              {loading ? (
                <Skeleton width={150} height={30} />
              ) : (
                ` Feels Like ${main.feels_like}${
                  unit === "metric" ? "°C" : "°F"
                }`
              )}
            </Typography>
            <Typography component={"span"} sx={{ color: "text.primary" }}>
              {loading ? (
                <Skeleton width={150} height={30} />
              ) : (
                ` Max ${main.temp_max}${unit === "metric" ? "°C" : "°F"}`
              )}
            </Typography>
            <Typography component={"span"} sx={{ color: "text.primary" }}>
              {loading ? (
                <Skeleton width={150} height={30} />
              ) : (
                ` Min ${main.temp_min}${unit === "metric" ? "°C" : "°F"}`
              )}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            {loading ? (
              <Skeleton width={100} height={100} variant="circular" />
            ) : (
              <img
                src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                alt={weather[0].description}
                width={100}
                className="object-cover h-auto w-full"
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
      {index !== 0 && (
        <CardActions>
          {loading ? (
            <Skeleton className="ml-3" width={150} height={40} />
          ) : (
            <Button
              onClick={() => handleDelete(id)}
              size="medium"
              variant="outlined"
              endIcon={<ClearIcon />}
            >
              Delete{" "}
            </Button>
          )}
        </CardActions>
      )}
      <Divider />
    </Card>
  );
};
export default CityCard;
