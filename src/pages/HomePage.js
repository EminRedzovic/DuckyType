import React, { useState, useEffect } from "react";
import "../style/style.css";
import { Typography, Button, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import duck from "../assets/duck.png";
import Layout from "../containers/Layout";
import { getBoardData } from "../firebase";

function HomePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);
  console.log(isMobile);
  // const [boardData, setboardData] = useState("");
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 950);
  };
  const loadData = async () => {
    try {
      const boardData = await getBoardData();
      setData(boardData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      <Box className="main-div">
        <Box className="wrapper">
          <Box className="card">
            <Box className="image">
              {" "}
              <img
                src={duck}
                alt="logo"
                width="60px"
                style={{ width: "100%" }}
              />
            </Box>
            <Box className="card-wrapper">
              <Box className="card-text">
                <center>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    DuckyType - Practice ur typing speed!
                  </Typography>
                </center>
              </Box>
              <Box className="card-button">
                <center>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "rgb(47, 46, 46)" }}
                    onClick={() => {
                      navigate("/practice");
                    }}
                  >
                    Practice
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "rgb(47, 46, 46)",
                      marginLeft: "10px",
                    }}
                    onClick={() => {
                      navigate("/room");
                    }}
                  >
                    Create a room
                  </Button>
                </center>
              </Box>
            </Box>
          </Box>

          <Box className="div2">
            <center>
              <Typography variant="h4">Leaderboard</Typography>
            </center>
            <Box>
              {data && data.length > 0 ? (
                data.map((item) => {
                  return (
                    <center>
                      <Typography
                        variant="h5"
                        sx={{ marginTop: "5px", marginLeft: "5px" }}
                      >
                        {item.username} - {item.wpm} - {item.accuracy}
                      </Typography>
                    </center>
                  );
                })
              ) : (
                <center>
                  <CircularProgress />
                </center>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default HomePage;
