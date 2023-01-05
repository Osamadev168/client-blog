import AppBar from "../components/Appbar.jsx";
import Catagories from "../components/Catagories.jsx";
import Featured from "../components/Featured.jsx";
import Footer from "../components/Footer.jsx";
import Carousel from "../components/Carouel.jsx";
const Home = () => {
  return (
    <>
      <AppBar />
      <Carousel />
      <Catagories />
      <Featured />
      <Footer />
    </>
  );
};

export default Home;
