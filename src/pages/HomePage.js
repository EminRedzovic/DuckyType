import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";
function HomePage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 750);
    setIsMenuOpen(false); // Zatvaranje menija kad se prozor promeni
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar
          style={{ backgroundColor: "#635c5f" }}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <img
            src={logo}
            alt="logo"
            width="220px"
            style={{ paddingLeft: "30px" }}
          />

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="menu"
              sx={{ paddingRight: "30px" }}
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box display="flex" sx={{ paddingRight: "30px" }}>
              <Button sx={{ paddingRight: "20px", color: "white" }}>
                Home
              </Button>
              <Button sx={{ paddingRight: "20px", color: "white" }}>
                About us
              </Button>
              <Button sx={{ paddingRight: "20px", color: "white" }}>
                Contact
              </Button>
              <div
                style={{
                  width: "1px",
                  height: "30px",
                  backgroundColor: "#d1d1d1",
                }}
              ></div>
              <Button sx={{ paddingRight: "20px", color: "white" }}>
                Sign in
              </Button>
              <Button sx={{ paddingRight: "20px", color: "white" }}>
                0 Races
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {isMobile && isMenuOpen && (
        <Box
          display="flex"
          flexDirection="column"
          style={{ backgroundColor: "#635c5f" }}
        >
          <Button sx={{ color: "white" }}>Home</Button>
          <Divider />
          <Button sx={{ color: "white" }}>About us</Button>
          <Divider />
          <Button sx={{ color: "white" }}>Contact</Button>
          <Divider />
        </Box>
      )}
    </div>
  );
}

export default HomePage;
