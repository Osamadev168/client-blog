import { Box } from "@mui/system";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
import { app } from "../../firebase/config.js";
import { useContext, useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { Button, Container } from "@mui/material";
import { DataContext } from "../Context/context.jsx";
import { Navigate, useNavigate } from "react-router-dom";
const GoogleLogin = () => {
  const [token, setToken] = useState("");
  // const [user, setUser] = useState(false);
  const { user, setUser } = useContext(DataContext);
  const navigate = useNavigate();
  const singOutUser = () => {
    try {
      const auth = getAuth(app);
      signOut(auth).then(() => {});
      navigate("/");
    } catch (e) {
      alert(e);
    }
  };

  const login = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const tokenuser = credential.idToken;
        setToken(tokenuser);
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Container>
      {user ? (
        <Button onClick={() => singOutUser()}>Signout</Button>
      ) : (
        <GoogleButton onClick={() => login()} />
      )}
    </Container>
  );
};

export default GoogleLogin;
