import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { format, parseISO } from "date-fns";

import ImageCard from "../ImageCard";
import "./image-container.css";

const ImageContainer = () => {
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [dateValue, setDateValue] = useState(null);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const roverName = location.pathname.split("/")[2];

  // useEffect(() => {
  //   async function getImageData() {
  //     const imageData = await fetch(
  //       `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${currentDate}&api_key=DEMO_KEY`
  //     );

  //     const imageJson = await imageData.json();
  //     setImages(imageJson.photos);
  //   }
  //   getImageData();
  // }, []);

  const fetchSelectedDay = async () => {
    const imageData = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${dateValue}&api_key=DEMO_KEY`
    );

    const imageJson = await imageData.json();
    setImages(imageJson.photos);
    setDateValue(null);
  };

  // add functionality if date selected is before landing date throw error
  // add functionality if date selected is after currentDate throw error

  return (
    <div>
      <div className="image-top-container">
        <Typography align="left">Images From:</Typography>
        <Typography align="left" variant="body2" color="text.secondary">
          {`${roverName.toUpperCase()} Rover`}
        </Typography>

        <Typography align="left">On:</Typography>
        <Typography align="left" variant="body2" color="text.secondary">
          {dateValue ? dateValue : currentDate}
        </Typography>
        <div className="wrapper">
          <DatePicker
            label="Select Date"
            value={parseISO(dateValue)}
            onChange={(newValue) => {
              setDateValue(format(newValue, "yyyy-MM-dd"));
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
          <Button variant="outlined" onClick={fetchSelectedDay} disabled>
            Submit
          </Button>
        </div>
      </div>
      <div className="image-container">
        {images && images.length ? (
          images.map((a) => {
            return <ImageCard image={a.img_src} />;
          })
        ) : (
          <Typography align="center">
            No Images For This Date Please Select Another Date
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ImageContainer;
