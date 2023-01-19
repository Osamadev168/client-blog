import Footer from "../components/Footer.jsx";

import { lazy } from "react";
const Latest = lazy(() => import("./LatestPosts.jsx"));
const Carousel = lazy(() => import("./Carouel.jsx"));
const Catagories = lazy(() => import("./Catagories.jsx"));
const Popular = lazy(() => import("./Popular.jsx"));

const Home = () => {
  return (
    <>
      <Carousel />
      <Catagories />
      <Latest />
      <Popular />
      <Footer />
    </>
  );
};

export default Home;
