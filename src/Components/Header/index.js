import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useLocation } from "react-router-dom";

import Logo from "../../assets/logo.png";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateHome = () => navigate("/");

  return (
    <div className={location.pathName === "/" ? "home-header" : "header"}>
      {location.pathname !== "/" ? (
        <Tooltip title="Return to Rovers" arrow>
          <img
            style={{ cursor: "pointer" }}
            height="36px"
            width="36px"
            src={Logo}
            alt="logo"
            onClick={navigateHome}
          />
        </Tooltip>
      ) : (
        <img height="36px" width="36px" src={Logo} alt="logo" />
      )}
    </div>
  );
};

export default Header;
