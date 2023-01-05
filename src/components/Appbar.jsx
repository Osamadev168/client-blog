import { AppBar, Toolbar, styled, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Component = styled(AppBar)`
  background: #2f2f2f;
  color: white;
`;

const Container = styled(Toolbar)`
  & > a {
    padding: 20px;
    color: white;
    text-decoration: none;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const logout = async () => navigate("/account");

  return (
    <Component>
      <Container>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
      </Container>
    </Component>
  );
};

export default Header;
