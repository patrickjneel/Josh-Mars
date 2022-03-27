import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import "./rover-container.css";
import RoverCardInfo from "../RoverCardInfo";
import { Typography } from "@mui/material";

const RoverContainer = () => {
  const [roverData, setRoverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const getRoverData = async () => {
  //     try {
  //       const roverData = await fetch(
  //         "https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=DEMO_KEY"
  //       );
  //       if (!roverData.ok) {
  //         throw new Error(`HTTP error: The status is ${roverData.status}`);
  //       }
  //       const roverJson = await roverData.json();

  //       setRoverData(roverJson.rovers);
  //     } catch (err) {
  //       setError(err.message);
  //       setRoverData(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getRoverData();
  // }, []);

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <CircularProgress size={55} color="warning" />
        </div>
      ) : (
        <div className="main-container">
          <Typography
            align="center"
            variant="h3"
            color="text.secondary"
            sx={{ fontWeight: "light" }}
          >
            Mars Rovers
          </Typography>
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
                  <RoverCardInfo
                    key={id}
                    name={name}
                    launchDate={launch_date}
                    landingDate={landing_date}
                    totalPhotos={total_photos}
                    cameras={cameras}
                  />
                )
              )
            : null}
          {error && (
            <div>{`There is an issue fetching the data - ${error}`}</div>
          )}
        </div>
      )}
    </>
  );
};

export default RoverContainer;
