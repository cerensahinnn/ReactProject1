import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [message, setMessage] = useState("");

  function LoginFetch() {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      api_key: mail,
      secret: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://gatewaydev.goldtaggateway.com/Vendors/Login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Success) {
          localStorage.setItem("Token", result.Data.token);
          navigate("/Content");
        } else {
          setMessage(result.Message);
          setError(true);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <Container
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "600px",
          height: "500px",
          // backgroundColor: "red",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          borderRadius: 10,
          boxShadow: "70px",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            fontSize: "40px",
            fontFamily: "Arial",
          }}
        >
          Login
        </Typography>
        <TextField
          required
          id="outlined-required"
          fullWidth
          label="Email"
          placeholder="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          fullWidth
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Box>
            <Alert severity="error">{message}</Alert>
          </Box>
        )}
        <Button onClick={LoginFetch}>
          <Typography>Login</Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
