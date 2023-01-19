import { AppBar, Toolbar, styled, Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getAuth, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/config";
import { DataContext } from "../Context/context";

const Component = styled(AppBar)`
  background: #2f2f2f;
  color: white;
`;

const Container = styled(Toolbar)`
  & > a {
    padding: 8px;
    color: white;
    text-decoration: none;
  }
`;

const Header = () => {
  const [refresh, setRefresh] = useState(false);
  const { user } = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {}, [refresh]);
  const handleClick = () => {
    signOut(getAuth(app));
    setRefresh(!refresh);
    navigate("/");
  };
  return (
    <Grid sx={{ flexGrow: 1 }}>
      <Component>
        <Container>
          <Link to="/">Home</Link>
          {user ? (
            <Button
              style={{ textDecoration: "none" }}
              onClick={() => {
                handleClick();
              }}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/create">Create Blog</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About us</Link>
          {user && user.email !== "osamatwenty@gmail.com" ? (
            <>
              <Link to="/userdashboard">User Dashboard</Link>
            </>
          ) : (
            <></>
          )}
          {user && user.email === "osamatwenty@gmail.com" ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <></>
          )}
        </Container>
      </Component>
    </Grid>
  );
};

export default Header;
