import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import DataProvider from "./Context/context.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Header from "./components/Appbar.jsx";
import Login from "./components/Login.jsx";
import Contact from "./components/Contact.jsx";
import Details from "./components/Details.jsx";
function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postdetails" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
