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
  useEffect(() => {}, []);
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
                onClick={() => {
                  navigate("/practice");
                }}
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
