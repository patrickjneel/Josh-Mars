import React, { useEffect, useState } from "react";

import "./rover-container.css";
import RoverCardInfo from "../RoverCardInfo";

const RoverContainer = () => {
  const [roverData, setRoverData] = useState([]);

  // useEffect(() => {
  //   async function getRoverData() {
  //     const roverData = await fetch(
  //       "https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=DEMO_KEY"
  //     );
  //     const roverJson = await roverData.json();
  //     setRoverData(roverJson.rovers);
  //   }
  //   getRoverData();
  // }, []);

  return (
    <div className="main-container">
      {roverData && roverData.length ? (
        roverData.map(
          ({ name, launch_date, landing_date, total_photos, id, cameras }) => (
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
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default RoverContainer;
