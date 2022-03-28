import React, { useCallback, useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useLocation } from "react-router-dom";
import { format, parseISO } from "date-fns";

import ImageCard from "../ImageCard";
import "./image-container.css";
import Logo from "../../assets/logo.png";
import BeachRover from "../../assets/rover5.png";
import RoverError from "../../assets/roverError.png";

const ImageContainer = () => {
  const location = useLocation();
  const [images, setImages] = useState([]);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const [dateValue, setDateValue] = useState(currentDate);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorText, setErrorText] = useState("");
  const roverName = location.pathname.split("/")[2];

  // useEffect(() => {
  //   const getImageData = async () => {
  //     try {
  //       const imageData = await fetch(
  //         `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${currentDate}&api_key=DEMO_KEY`
  //       );

  //       if (!imageData.ok)
  //         throw new Error(`HTTP error: The status is ${imageData.status}`);

  //       const imageJson = await imageData.json();
  //       setImages(imageJson.photos);
  //       setError(null);
  //     } catch (err) {
  //       setError(err);
  //       setImages(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getImageData();
  // }, []);

  const fetchSelectedDay = async () => {
    try {
      const imageData = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${parseISO(
          dateValue
        )}&api_key=DEMO_KEY`
      );
      if (!imageData.ok)
        throw new Error(`HTTP error: The status is ${imageData.status}`);
      const imageJson = await imageData.json();
      setImages(imageJson.photos);
      setDateValue(null);
    } catch (err) {
      setError();
      setImages(null);
    } finally {
      setLoading(false);
    }
  };

  const landingDateObj = useMemo(
    () => ({
      spirit: "2002-12-3",
      curiosity: "2002-12-3",
      perseverance: "2002-12-3",
      other: "2002-12-3",
    }),
    []
  );

  const errorTextHandler = useCallback(
    (selectedValue) => {
      if (selectedValue > currentDate) {
        setErrorText(
          `Please Select a Date Earlier Than ${format(
            parseISO(currentDate),
            "MM-dd-yyyy"
          )}`
        );
      } else if (selectedValue < landingDateObj[roverName]) {
        setErrorText(
          `Please Select a Date Later Than ${format(
            new Date(landingDateObj[roverName]),
            "MM-dd-yyyy"
          )}`
        );
      } else setErrorText("");
    },

    [currentDate, landingDateObj, roverName]
  );

  return (
    <div>
      <div className="image-top-container">
        <Typography align="left">Images From:</Typography>
        <Typography align="left" variant="body2" color="text.secondary">
          {`${roverName.toUpperCase()} Rover`}
        </Typography>
        <Typography align="left">On:</Typography>
        {errorText ? (
          <Typography align="left" variant="body2" color="red">
            {errorText}
          </Typography>
        ) : (
          <Typography
            align="left"
            variant="body2"
            color="text.secondary"
            sx={{ minHeight: "20px" }}
          >
            {format(parseISO(dateValue), "MM-dd-yyyy")}
          </Typography>
        )}
        <div className="wrapper" style={{ marginTop: "5px" }}>
          <DatePicker
            label="Select Date"
            value={parseISO(dateValue)}
            onChange={(newValue) => {
              setDateValue(format(newValue, "yyyy-MM-dd"));
              errorTextHandler(format(newValue, "yyyy-MM-dd"));
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
          <Button
            sx={{ height: 40, marginLeft: "15px" }}
            variant="outlined"
            onClick={fetchSelectedDay}
            // disabled={errorText !== ""}
            disabled
          >
            Submit
          </Button>
        </div>
      </div>
      <div
        className={
          images && images.length ? "image-container" : "empty-image-container"
        }
      >
        {loading && <CircularProgress size={55} color="warning" />}
        {images && images.length ? (
          images.map((a) => <ImageCard image={a.img_src} />)
        ) : (
          <div className={error ? "hide" : null}>
            <img src={BeachRover} alt={BeachRover} height="180" width="180" />
            <Typography
              align="center"
              variant="h5"
              color="text.secondary"
              sx={{ fontWeight: "light" }}
            >
              The Rover Was Off That Day. Please Select Another Date.
            </Typography>
          </div>
        )}
        {error && (
          <div>
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
        )}
      </div>
      <Tooltip title="Scroll to Top" arrow>
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
      </Tooltip>
    </div>
  );
};

export default ImageContainer;
