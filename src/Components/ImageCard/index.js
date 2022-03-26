import React from "react";
import { string } from "prop-types";

import "./image-card.css";

const ImageCard = ({ image }) => {
  return <img className="rover-image" src={image} alt="rover" />;
};

ImageCard.propTypes = {
  image: string,
};

export default ImageCard;
