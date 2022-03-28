import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import "./rover-container.css";
import RoverCardInfo from "../RoverCardInfo";
import { Grid, Typography } from "@mui/material";
import RoverError from "../../assets/roverError.png";

const RoverContainer = () => {
  const [roverData, setRoverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRoverData = async () => {
      try {
        const roverData = await fetch(
          "https://api.nasa.gov/mars-photos/api/v1/rov/?api_key=DEMO_KEY"
        );
        if (!roverData.ok) {
          throw new Error(`HTTP error: The status is ${roverData.status}`);
        }
        const roverJson = await roverData.json();

        setRoverData(roverJson.rovers);
      } catch (err) {
        setError(err.message);
        setRoverData(null);
      } finally {
        setLoading(false);
      }
    };
    getRoverData();
  }, []);

  return (
    <>
      {error ? (
        <div className="empty-rover-container">
          <img src={RoverError} alt={RoverError} height="180" width="180" />
          <Typography
            align="center"
            variant="h5"
            color="text.secondary"
            sx={{ fontWeight: "light" }}
          >
            The Rover Has Run Into An Issue. Please Try Again.
          </Typography>
        </div>
      ) : (
        <div style={{ backgroundColor: "#FDFEE7" }}>
          <Typography
            align="center"
            variant="h3"
            color="text.secondary"
            sx={{ fontWeight: "light" }}
          >
            Mars Rovers
          </Typography>
        </div>
      )}
      {loading ? (
        <div className="loading-container">
          <CircularProgress size={55} color="warning" />
        </div>
      ) : (
        <div className={!error ? "main-container" : "hide"}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {roverData && roverData.length
              ? roverData.map(
                  ({
                    name,
                    launch_date,
                    landing_date,
                    total_photos,
                    id,
                    cameras,
                  }) => (
                    <Grid item xs={12} sm={6} md={4}>
                      <RoverCardInfo
                        key={id}
                        name={name}
                        launchDate={launch_date}
                        landingDate={landing_date}
                        totalPhotos={total_photos}
                        cameras={cameras}
                      />
                    </Grid>
                  )
                )
              : null}
          </Grid>
        </div>
      )}
    </>
  );
};

export default RoverContainer;
