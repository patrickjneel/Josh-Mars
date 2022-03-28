import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
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
  const [anchorEl, setAnchorEl] = useState(null);

  const navigateToDetails = (name) => {
    navigate(`/rover/${name}`);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Card sx={{ maxWidth: 345 }} className="card">
      <CardMedia
        component="img"
        height="150"
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
        <Grid container spacing={1}>
          <Grid item xs={6} md={4}>
            <Typography align="left" sx={{ color: "black", fontSize: "15px" }}>
              Landing Date:
            </Typography>
            <Typography align="left" variant="body2" color="text.secondary">
              {new Date(landingDate).toDateString()}
              <Typography
                align="left"
                sx={{ color: "black", fontSize: "15px" }}
              >
                Launch Date:
              </Typography>
              <Typography align="left" variant="body2" color="text.secondary">
                {new Date(launchDate).toDateString()}
              </Typography>
              <Typography
                align="left"
                sx={{ color: "black", fontSize: "15px" }}
              >
                Total Photos:
              </Typography>
              <Typography align="left" variant="body2" color="text.secondary">
                {totalPhotos.toLocaleString("en-US")}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={6} md={8}>
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              Rover Cameras
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 2 }}>
                {cameras.map(({ full_name }) => (
                  <Typography
                    key={full_name}
                    align="left"
                    color="text.secondary"
                    variant="caption"
                  >
                    {full_name},
                  </Typography>
                ))}
              </Typography>
            </Popover>
          </Grid>
        </Grid>
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
