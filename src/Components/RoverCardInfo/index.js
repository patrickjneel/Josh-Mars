import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { string, number, arrayOf, objectOf } from "prop-types";

import Mars from "../../assets/mars.jpeg";
import "./rover-card-info.css";

const RoverCardInfo = ({
  name,
  launchDate,
  landingDate,
  totalPhotos,
  cameras,
}) => {
  const navigate = useNavigate();

  function navigateToDetails(name) {
    navigate(`/rover/${name}`);
  }

  return (
    <Card sx={{ maxWidth: 345 }} className="card">
      <CardMedia
        component="img"
        height="200"
        image={Mars}
        alt={`${name}-rover`}
      />
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
          {new Date(launchDate).toDateString()}
        </Typography>
        <Typography align="left">Total Photos:</Typography>
        <Typography align="left" variant="body2" color="text.secondary">
          {totalPhotos.toLocaleString("en-US")}
        </Typography>
        <Typography align="left">Cameras:</Typography>
        {cameras.map(({ full_name }) => (
          <Typography key={full_name} align="left">
            {full_name}
          </Typography>
        ))}
        <Button
          className="link-button"
          variant="outlined"
          onClick={() => navigateToDetails(name.toLowerCase())}
        >
          Link to Rover Images
        </Button>
      </CardContent>
    </Card>
  );
};

RoverCardInfo.propTypes = {
  name: string,
  launchDate: string,
  landingDate: string,
  totalPhotos: number,
  cameras: arrayOf(objectOf(string)),
};

export default RoverCardInfo;
