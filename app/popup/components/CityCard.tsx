import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { OpenweatherData, fetchRequest } from "../utils/api";
import { Grid, Skeleton } from "@mui/material";

type Props = {
  city: string;
};
const CityCard: React.FC<Props> = ({ city }) => {
  const [weatherInfo, setWeatherInfo] = useState<OpenweatherData | null>(null);
  useEffect(() => {
    fetchRequest(city)
      .then((data) => setWeatherInfo(data))
      .catch((err) => console.log(err));
  }, [city]);
  console.log(weatherInfo);

  return (
    <Card sx={{ minWidth: 340, borderRadius: 0 }}>
      <CardContent>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item xs={6}>
            <Typography variant="h4" sx={{ color: "primary.main" }}>
              {!weatherInfo ? <Skeleton /> : city}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex" }}
            justifyContent={"flex-end"}
          >
            <Typography variant="h6" sx={{ color: "primary.main" }}>
              {!weatherInfo ? (
                <Skeleton width={100} />
              ) : (
                `${weatherInfo.main.temp}°C`
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
              {!weatherInfo ? (
                <Skeleton width={150} height={30} />
              ) : (
                ` Feels Like ${weatherInfo.main.feels_like}°C`
              )}
            </Typography>
            <Typography component={"span"} sx={{ color: "text.primary" }}>
              {!weatherInfo ? (
                <Skeleton width={150} height={30} />
              ) : (
                ` Max ${weatherInfo.main.temp_max}°C`
              )}
            </Typography>
            <Typography component={"span"} sx={{ color: "text.primary" }}>
              {!weatherInfo ? (
                <Skeleton width={150} height={30} />
              ) : (
                ` Min ${weatherInfo.main.temp_min}°C`
              )}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            {!weatherInfo ? (
              <Skeleton width={100} height={100} variant="circular" />
            ) : (
              <img
                src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
                alt={weatherInfo.weather[0].description}
                width={100}
                className="object-cover h-auto w-full"
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        {!weatherInfo ? (
          <Skeleton className="ml-3" width={150} height={40} />
        ) : (
          <Button size="medium">Learn More</Button>
        )}
      </CardActions>
    </Card>
  );
};
export default CityCard;
