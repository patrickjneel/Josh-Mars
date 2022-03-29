import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigateToDetails = (name) => {
    navigate(`/rover/${name}`);
  };

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundColor: "white",
  };

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
            <Button variant="contained" onClick={handleOpen}>
              Cameras
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-camera-names"
              aria-describedby="modal-modal-description"
            >
              <Box style={boxStyle}>
                <Typography
                  id="modal-camera-names"
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: 500, padding: "5px" }}
                >
                  {`Cameras For ${name} Rover`}
                </Typography>
                {cameras.map(({ full_name }) => (
                  <Typography key={nanoid()} sx={{ padding: "5px" }}>
                    {full_name},
                  </Typography>
                ))}
              </Box>
            </Modal>
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
