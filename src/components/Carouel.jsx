import React, { Component, useContext } from "react";
import Slider from "react-slick";
import { DataContext } from "../Context/context";
import Kittens from "../assets/Kittens.jpg";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Carousel = () => {
  const { posts } = useContext(DataContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div>
      <Slider {...settings}>
        {posts.map((post, index) => {
          return (
            <div key={index}>
              <Link to={`details/${post._id}`}>
                <img
                  src={post.image}
                  style={{ width: "100%", height: 500 }}
                  loading="lazy"
                />
              </Link>
              <Typography
                style={{
                  textAlign: "center",
                  fontSize: 30,
                }}
              >
                {post.title}
              </Typography>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
export default Carousel;
