import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext, { DataContext } from "./Context/context.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Header from "./components/Header.jsx";
import Contact from "./components/Contact.jsx";
import Details from "./components/Details.jsx";
import CreateBlog from "./components/Create.jsx";
import CategoryDetails from "./components/CategoryDetails.jsx";
import Dashboard from "./components/Dashboard.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import GoogleLogin from "./components/GoogleLogin.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Header />
        <div style={{ marginTop: 80 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<GoogleLogin />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route path="/userdashboard" element={<UserDashboard />} />

            <Route path="/details/:id" element={<Details />} />
            <Route path="/posts/:category/details/:id" element={<Details />} />

            <Route path="/posts/:category" element={<CategoryDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
