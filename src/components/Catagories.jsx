import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import News from "../assets/News.jpg";
import { Card } from "@mui/material";
import Sports from "../assets/Sports.jpg";
import Blog from "../assets/blogpic.jpg";
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
    <Box sx={{ flexGrow: 1 }}>
      <h1>Catagories</h1>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item style={{ backgroundImage: `url(${News})` }}>
            <h1 onMouseOver={HoverEnter} onMouseLeave={HoverLeave}>
              News
            </h1>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item style={{ backgroundImage: `url(${Sports})` }}>
            <h1 onMouseOver={HoverEnter} onMouseLeave={HoverLeave}>
              Sports
            </h1>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item style={{ backgroundImage: `url(${Blog})` }}>
            <h1 onMouseOver={HoverEnter} onMouseLeave={HoverLeave}>
              Blog
            </h1>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
