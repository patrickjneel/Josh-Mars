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
    <header className={location.pathname === "/" ? "home-header" : "header"}>
      {location.pathname !== "/" ? (
        <Tooltip title="Return to Rovers" arrow>
          <img
            className="josh-logo"
            style={{ cursor: "pointer" }}
            height="36px"
            width="36px"
            src={Logo}
            alt="logo"
            onClick={navigateHome}
          />
        </Tooltip>
      ) : (
        <img height="40px" width="40px" src={Logo} alt="logo" />
      )}
    </header>
  );
};

export default Header;
