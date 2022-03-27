import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { format, parseISO } from "date-fns";

import ImageCard from "../ImageCard";
import "./image-container.css";
import Logo from "../../assets/logo.png";

const ImageContainer = () => {
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [dateValue, setDateValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorText, setErrorText] = useState("");
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const roverName = location.pathname.split("/")[2];

  useEffect(() => {
    const getImageData = async () => {
      try {
        const imageData = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${currentDate}&api_key=DEMO_KEY`
        );

        if (!imageData.ok)
          throw new Error(`HTTP error: The status is ${imageData.status}`);

        const imageJson = await imageData.json();
        setImages(imageJson.photos);
        setError(null);
      } catch (err) {
        setError(err);
        setImages(null);
      } finally {
        setLoading(false);
      }
    };
    getImageData();
  }, []);

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
          <Button
            sx={{ height: 40, marginLeft: "15px" }}
            variant="outlined"
            onClick={fetchSelectedDay}
            disabled
          >
            Submit
          </Button>
        </div>
      </div>
      <div className="image-container">
        {loading && <CircularProgress size={55} color="warning" />}
        {images && images.length
          ? images.map((a) => <ImageCard image={a.img_src} />)
          : null}
        {error && (
          <div>
            <Typography align="center">
              No Images For This Date Please Select Another Date
            </Typography>
            <div>{`There is an issue fetching the data - ${error}`}</div>
          </div>
        )}
      </div>
      <Button
        sx={{
          borderRadius: 25,
          height: 60,
          width: 45,
          transition: ".2s",
          position: "fixed",
          bottom: "1.2rem",
          right: "1.5rem",
          zIndex: 15,
        }}
        onClick={() => window.scrollTo(0, 0)}
        variant="contained"
      >
        {<img src={Logo} alt={Logo} height="35" width="35" />}
      </Button>
    </div>
  );
};

export default ImageContainer;
