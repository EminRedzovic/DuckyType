import React, { useState, useEffect } from "react";
import "../style/style.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";
import duck from "../assets/duck.png";
import { useNavigate } from "react-router-dom";
import { auth, getLoggedInUserData, logout } from "../firebase";
const Layout = (props) => {
  const getData = async (user) => {
    try {
      const result = await getLoggedInUserData(user);
      setUser(result);
    } catch (error) {
      alert(error);
    }
  };

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      getData(user);
    });
  }, []);
  console.log(user);
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
              onClick={() => {
                navigate("/");
              }}
              sx={{
                display: "flex",
                alignItems: "center ",
                cursor: "pointer",
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
                <Button
                  className="nav-button"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Home
                </Button>
                <Button className="nav-button">About us</Button>
                <Button className="nav-button">Updates</Button>
                <div
                  style={{
                    width: "1px",
                    height: "30px",
                    backgroundColor: "#d1d1d1",
                    margin: "0px 10px 0px 10px",
                  }}
                ></div>
                {user ? (
                  <Button className="nav-button" onClick={logout}>
                    Logout
                  </Button>
                ) : (
                  <Button
                    className="nav-button"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Sign in
                  </Button>
                )}

                <Button className="nav-button">0 Races</Button>
                {user && (
                  <Button className="nav-button">{user.displayName}</Button>
                )}
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
      <Divider></Divider>
      <Box>{props.children}</Box>
    </>
  );
};

export default Layout;
