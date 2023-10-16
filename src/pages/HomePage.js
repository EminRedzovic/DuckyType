import React, { useState, useEffect } from "react";
import "../style/style.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";
import duck from "../assets/duck.png";

function HomePage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 950);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div>
        <AppBar position="static">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              background:
                "linear-gradient(90deg, rgba(16,24,32,1) 0%, rgba(26,36,46,1) 50%, rgba(36,41,47,1) 100%)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center ",
              }}
            >
              <img
                src={duck}
                alt="logo"
                width="60px"
                style={{ paddingLeft: "30px" }}
              />
              <img src={logo} alt="logo" width="180px" />
            </Box>

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
                  Updates
                </Button>
                <div
                  style={{
                    width: "1px",
                    height: "30px",
                    backgroundColor: "#d1d1d1",
                    margin: "0px 10px 0px 10px",
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
            sx={{
              background:
                "linear-gradient(90deg, rgba(16,24,32,1) 0%, rgba(26,36,46,1) 50%, rgba(36,41,47,1) 100%)",
            }}
          >
            <Button sx={{ color: "white" }}>Home</Button>
            <Divider />
            <Button sx={{ color: "white" }}>About us</Button>
            <Divider />
            <Button sx={{ color: "white" }}>Updates</Button>
            <Divider />
          </Box>
        )}
      </div>
      <Box className="main-div">
        <Box className="wrapper">
          <Box className="div">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={duck}
                alt="logo"
                width="90px"
                style={{ paddingLeft: "10px" }}
              />
              <Typography
                variant="h5"
                color="warning"
                sx={{ textAlign: "center" }}
              >
                Duckytype - Practice your typing speed!
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="success"
                sx={{ margin: "10px" }}
              >
                Practice
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={() => {
                  navigate("/room");
                }}
                sx={{ margin: "10px" }}
              >
                Create a room
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HomePage;
