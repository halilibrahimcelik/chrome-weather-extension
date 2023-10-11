import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { fetchRequest } from "../utils/api";

type Props = {
  city: string;
};
const CityCard: React.FC<Props> = ({ city }) => {
  useEffect(() => {
    // fetchRequest(city)
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
  }, [city]);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          className="uppercase"
          color="text.primary"
          gutterBottom
        >
          Word of the Day
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
export default CityCard;
