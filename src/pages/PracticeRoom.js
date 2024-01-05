import React, { useState } from "react";
import "../style/practice.css";
import Layout from "../containers/Layout";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";

const PracticeRoom = () => {
  const mock = [
    "Do in laughter securing smallest sensible no mr hastened. As perhaps proceed in in brandon of limited unknown greatly. Distrusts fulfilled happiness unwilling as explained of difficult. No landlord of peculiar ladyship attended if contempt ecstatic. Loud wish made on is am as hard. Court so avoid in plate hence. Of received mr breeding concerns peculiar securing landlord. Spot to many it four bred soon well to. Or am promotion in no departure abilities.",
  ];
  const [words, setWords] = useState(50);
  const data2 = ["5", "10", "25", "50"];
  const text = mock[0].split(" ").slice(0, words);
  const [input, setInput] = useState("");
  const [data, setData] = useState([0, 0]);
  const [timer, setTimer] = useState(false);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (timer === true) {
      const interval = setInterval(() => {
        if (data[0] === text.length) {
          clearInterval(interval);
        } else {
          setCounter((prevCounter) => prevCounter + 1);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [timer]);
  const handleReset = () => {
    setData([0, 0]);
    setTimer(false);
    setCounter(0);
  };
  const handleSpace = (e) => {
    if (e.keyCode === 32 && input.length >= 2) {
      const textData = document.getElementById(data[0]);

      if (text[data[0]] === input) {
        textData.style.color = "white";
        data[0] = data[0] + 1;
        data[1]++;
        setInput("");
      } else {
        textData.style.color = "red";
        data[0] = data[0] + 1;
        setInput("");
      }
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
          {data[0] === text.length ? (
            <>
              <center>
                <Typography variant="h4">
                  Wpm: {((60 / counter) * data[1]).toFixed(1)}
                  <br />
                  Accuracy: {((data[1] / words) * 100).toFixed(1)}%
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
                  <span style={{ fontSize: "29px" }} id={index} key={index}>
                    {item + " "}
                  </span>
                );
              })}
            </Box>
          )}
        </Box>
        <Box className="inputBar">
          {data[0] !== text.length && (
            <input
              value={input}
              className="input"
              placeholder="Type ur text here!"
              onChange={(event) => {
                setInput(event.target.value.trim());
                setTimer(true);
              }}
              onKeyDown={handleSpace}
            />
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default PracticeRoom;
