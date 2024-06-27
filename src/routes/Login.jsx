import Cookies from "js-cookie";
import { useState } from "react";
import { Box, Button, Card, CardContent, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_BACKEND_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) alert("Cannot connect to server");
        if (data.access_token) {
          const token = data.access_token;
          Cookies.set("token", token, { expires: 2 });
          alert("Login Success!");
          navigate("/");
        } else {
          return alert(`Login failed: ${data.message}`);
        }
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#e0e1da"
      width="100vw"
      height="100vh"
    >
      <Card sx={{ minWidth: "25vw", minHeight: "50vh", p: "1rem" }}>
        <CardContent sx={{ height: "100%" }}>
          <Box
            display="flex"
            flexDirection="column"
            height="80%"
            component="form"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <img
              src="/kejagung.svg"
              alt="logo"
              style={{ maxHeight: "120px", marginBottom: "1rem" }}
            />
            <TextField
              label="Username"
              value={loginData.username}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, username: e.target.value }))
              }
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
              sx={{ mb: 4 }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
