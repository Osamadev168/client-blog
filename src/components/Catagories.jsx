import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import News from "../assets/News.jpg";
import { Card, Divider, Typography } from "@mui/material";
import Sports from "../assets/Sports.jpg";
import Blog from "../assets/blogpic.jpg";
import { Link } from "react-router-dom";
const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "white",
  backgroundImage: `url(${News})`,
  backgroundSize: "cover",
  height: 150,
  marginTop: 10,
}));
export default function BasicGrid() {
  const HoverEnter = (event) => {
    event.target.style.color = "green";
  };
  const HoverLeave = (event) => {
    event.target.style.color = "white";
  };
  return (
    <Box sx={{ flexGrow: 1 }} margin={2}>
      <Typography fontSize={30}>Categories</Typography>
      <Divider />
      <Grid spacing={2}>
        <Grid xs={12} lg={3} sm={3}>
          <Item style={{ backgroundImage: `url(${News})` }}>
            <Link
              to="posts/Sports"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography onMouseOver={HoverEnter} onMouseLeave={HoverLeave}>
                Sports
              </Typography>
            </Link>
          </Item>
        </Grid>
        <Grid xs={12} lg={4} sm={6}>
          <Item style={{ backgroundImage: `url(${Sports})` }}>
            <Link
              to="posts/Science"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography onMouseOver={HoverEnter} onMouseLeave={HoverLeave}>
                Science
              </Typography>
            </Link>
          </Item>
        </Grid>
        <Grid xs={12} lg={4} sm={6}>
          <Item style={{ backgroundImage: `url(${Blog})` }}>
            <Link
              to="posts/Tech"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography onMouseOver={HoverEnter} onMouseLeave={HoverLeave}>
                Technology
              </Typography>
            </Link>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
