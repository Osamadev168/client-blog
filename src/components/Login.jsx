import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { createAccount } from "../Api/Api.js";
import { DataContext } from "../Context/context.jsx";
const LoginInitialValues = {
  username: "",
  password: "",
};
const SignUpInitialValues = {
  name: "",
  username: "",
  password: "",
};
const Login = () => {
  const { user, setUser } = useContext(DataContext);
  const [login, setlogin] = useState(LoginInitialValues);
  const [singup, setSignup] = useState(SignUpInitialValues);
  const [account, toggleAccount] = useState("signup");
  const LoginInput = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };
  const SignUpInput = (e) => {
    setSignup({ ...singup, [e.target.name]: e.target.value });
  };
  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
  const createNewUser = async () => {
    try {
      createAccount(singup);
      setSignup(SignUpInitialValues);
      toggleAccount("login");
    } catch (e) {
      alert(e);
    }
  };
  const loginAccount = async () => {
    axios.post("http://localhost:5000/signin", login).then((res) => {
      sessionStorage.setItem("accessToken", `to${res.data.accesstoken}`);
      sessionStorage.setItem("refreshToken", `to${res.data.refreshToken}`);

      setUser({ name: res.data.name, username: res.data.username });
    });
  };
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      {account === "signup" ? (
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            padding: 10,
            width: "50%",
            marginTop: 100,
            justifyContent: "center",
            border: "1px solid #576989",
          }}
        >
          <TextField
            label="Enter Name"
            variant="standard"
            style={{ margin: 30 }}
            onChange={(e) => SignUpInput(e)}
            name="name"
          />

          <TextField
            label="Enter User Name"
            variant="standard"
            style={{ margin: 30 }}
            onChange={(e) => SignUpInput(e)}
            name="username"
          />
          <TextField
            label="Enter Password"
            variant="standard"
            style={{ margin: 30 }}
            onChange={(e) => SignUpInput(e)}
            name="password"
          />
          <Button variant="contained" onClick={() => createNewUser()}>
            Create Account
          </Button>
          <Button onClick={() => toggleSignup()}>login</Button>
        </div>
      ) : (
        <>
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              padding: 10,
              width: "50%",
              marginTop: 100,
              justifyContent: "center",
              border: "2px solid #576989",
            }}
          >
            <TextField
              label="Enter Username"
              variant="standard"
              value={login.username}
              style={{ margin: 30 }}
              onChange={(e) => LoginInput(e)}
              name="username"
            />

            <TextField
              label="Enter Password"
              variant="standard"
              value={login.password}
              style={{ margin: 30 }}
              onChange={(e) => LoginInput(e)}
              name="password"
            />

            <Button variant="contained" onClick={() => loginAccount()}>
              Login
            </Button>
            <Button onClick={() => toggleSignup()}>Create Account</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
