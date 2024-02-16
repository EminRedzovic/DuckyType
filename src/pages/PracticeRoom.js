import React, { useState } from "react";
import "../style/practice.css";
import Layout from "../containers/Layout";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";

const PracticeRoom = () => {
  const mock = [
    "make in laughter securing smallest sensible no mr hastened. As perhaps proceed in in brandon of limited unknown greatly. Distrusts fulfilled happiness unwilling as explained of difficult. No landlord of peculiar ladyship attended if contempt ecstatic. Loud wish made on is am as hard. Court so avoid in plate hence. Of received mr breeding concerns peculiar securing landlord. Spot to many it four bred soon well to. Or am promotion in no departure abilities.",
  ];
  const [words, setWords] = useState(50);
  const data2 = ["5", "10", "25", "50"];
  const text = mock[0].split(" ").slice(0, words);
  const [input, setInput] = useState("");
  const [data, setData] = useState({ currentIndex: 0, correctCount: 0 });
  const [timer, setTimer] = useState(false);
  const [counter, setCounter] = useState(0);
  const [setStartTime] = useState(null);
  useEffect(() => {
    if (timer === true) {
      const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
  const handleReset = () => {
    setData({ currentIndex: 0, correctCount: 0 });
    setTimer(false);
    setCounter(0);
    setStartTime(null);
  };
  const handleSpace = (e) => {
    if (e.keyCode === 32 && input.trim() === text[data.currentIndex]) {
      setData((prevData) => ({
        currentIndex: prevData.currentIndex + 1,
        correctCount: prevData.correctCount + 1,
      }));
      setInput("");
      if (data.currentIndex + 1 === text.length) {
        setTimer(false);
      }
    } else if (!timer && data.currentIndex === 0) {
      setStartTime(Date.now());
      setTimer(true);
    }
  };

  return (
    <Layout>
      <Box className="wrapper1">
        <Box className="select">
          <Box>
            <Typography
              sx={{
                padding: "5px",
                borderRight: ".5px solid #eeeeaf",
              }}
            >
              Select amount of words
            </Typography>
            {data2.map((item) => {
              return (
                <Typography
                  className="divider"
                  onClick={(e) => {
                    if (!timer) {
                      setWords(item);
                    }
                  }}
                >
                  {item}
                </Typography>
              );
            })}
          </Box>
          <Box>
            <Typography sx={{ padding: "5px" }}>
              Your best attempt : 102wpm //MOCKED
            </Typography>
          </Box>
        </Box>
        <Box className="main">
          {data.currentIndex === text.length ? (
            <>
              <center>
                <Typography variant="h4">
                  Wpm: {((60 / counter) * data.correctCount).toFixed(1)}
                  <br />
                  Accuracy: {((data.correctCount / words) * 100).toFixed(1)}%
                </Typography>
                <Button variant="outlined" onClick={handleReset}>
                  Reset
                </Button>
                <Typography variant="h3">Submit ur result</Typography>
                <Button variant="outlined">Submit</Button>
              </center>
            </>
          ) : (
            <Box>
              {text.map((item, index) => {
                return (
                  <span
                    style={{
                      fontSize: "29px",
                      color:
                        index < data.currentIndex
                          ? "white"
                          : index === data.currentIndex
                          ? input.trim() === item
                            ? "white"
                            : "red"
                          : "",
                    }}
                    key={index}
                  >
                    {item + " "}
                  </span>
                );
              })}
            </Box>
          )}
        </Box>
        <Box className="inputBar">
          {data.currentIndex !== text.length && (
            <input
              value={input}
              className="input"
              placeholder="Type ur text here!"
              onChange={(event) => {
                setInput(event.target.value);
              }}
              onKeyDown={handleSpace}
              disabled={data.currentIndex === text.length}
            />
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default PracticeRoom;
