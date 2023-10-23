import React from "react";
import "../style/practice.css";
import Layout from "../containers/Layout";
import { Box, Typography } from "@mui/material";

const PracticeRoom = () => {
  const mock = [
    "Do in laughter securing smallest sensible no mr hastened. As perhaps proceed in in brandon of limited unknown greatly. Distrusts fulfilled happiness unwilling as explained of difficult. No landlord of peculiar ladyship attended if contempt ecstatic. Loud wish made on is am as hard. Court so avoid in plate hence. Of received mr breeding concerns peculiar securing landlord. Spot to many it four bred soon well to. Or am promotion in no departure abilities.",
  ];
  const text = mock[0].split(" ").slice(0, 50);
  console.log(text);
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
            <Typography className="divider">5</Typography>
            <Typography className="divider">15</Typography>
            <Typography className="divider">25</Typography>
            <Typography className="divider">50</Typography>
          </Box>
          <Box>
            <Typography sx={{ padding: "5px" }}>
              Your best attempt : 102wpm
            </Typography>
          </Box>
        </Box>
        <Box className="main">
          {text.map((item) => {
            return <span>{item + " "}</span>;
          })}
        </Box>
        <Box className="inputBar">
          <input className="input" placeholder="Type ur text here!" />
        </Box>
      </Box>
    </Layout>
  );
};

export default PracticeRoom;
