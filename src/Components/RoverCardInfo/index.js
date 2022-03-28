import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";
import { useNavigate } from "react-router-dom";
import { string, number, array } from "prop-types";
import { nanoid } from "nanoid";

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
        height="100"
        image={Mars}
        alt={`${name}-rover`}
      />
      <CardContent>
        <Typography
          align="center"
          sx={{
            fontSize: 20,
            borderBottom: "1px solid black",
            paddingBottom: "5px",
          }}
          gutterBottom
          component="div"
        >
          {name}
        </Typography>
        <Grid container spacing={1} sx={{ alignItems: "center" }}>
          <Grid item xs={6} md={4}>
            <Typography align="left" sx={{ fontSize: "15px" }}>
              Landing Date:
            </Typography>
            <Typography align="left" variant="body2" color="text.secondary">
              {new Date(landingDate).toDateString()}
            </Typography>
            <Typography align="left" sx={{ fontSize: "15px" }}>
              Launch Date:
            </Typography>
            <Typography align="left" variant="body2" color="text.secondary">
              {new Date(launchDate).toDateString()}
            </Typography>
            <Typography align="left" sx={{ fontSize: "15px" }}>
              Total Photos:
            </Typography>
            <Typography align="left" variant="body2" color="text.secondary">
              {totalPhotos.toLocaleString("en-US")}
            </Typography>
          </Grid>
          <Grid item xs={6} md={8} key={nanoid()}>
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              Cameras
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
                    key={nanoid()}
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
          sx={{ marginTop: "15px" }}
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
  cameras: array,
};

export default RoverCardInfo;
