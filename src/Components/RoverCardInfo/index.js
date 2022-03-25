import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Mars from "../../assets/mars.jpeg";
import "./rover-card-info.css";

const RoverCardInfo = ({
  name,
  launchDate,
  landingDate,
  totalPhotos,
  id,
  cameras,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }} className="card">
      <CardMedia component="img" height="200" image={Mars} alt="rover" />
      <CardContent>
        <Typography
          align="left"
          sx={{ fontSize: 20 }}
          gutterBottom
          component="div"
        >
          {name}
        </Typography>
        <Typography align="left">Landing Date:</Typography>
        <Typography align="left" variant="body2" color="text.secondary">
          {new Date(landingDate).toDateString()}
        </Typography>
        <Typography align="left">Launch Date:</Typography>
        <Typography align="left" variant="body2" color="text.secondary">
          {new Date(landingDate).toDateString()}
        </Typography>
        <Typography align="left">Total Photos:</Typography>
        <Typography align="left" variant="body2" color="text.secondary">
          {totalPhotos.toLocaleString("en-US")}
        </Typography>
        <Button
          className="link-button"
          variant="outlined"
          onClick={() => console.log(`clicked ${id}`)}
        >
          Links To Cameras
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoverCardInfo;
