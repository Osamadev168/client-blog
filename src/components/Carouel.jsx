import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import Sports from "../assets/Sports.jpg";
import News from "../assets/News.jpg";
export default function Example(props) {
  var items = [
    {
      name: Sports,
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: News,
      description: "Hello World!",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper>
      <img src={props.item.name} style={{ width: "100%", height: 300 }} />
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}
