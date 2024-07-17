import Cookies from "js-cookie";
import { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Navigate, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [showPasswd, setShowPasswd] = useState(false);
  const authSuccess = Cookies.get("token");

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

  if (authSuccess) {
    return <Navigate to="/" />;
  }

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
      <Card sx={{ minWidth: "35vw", minHeight: "50vh", p: "1rem" }}>
        <CardContent sx={{ height: "100%" }}>
          <Stack gap={4}>
            <img
              src="/kejagung.svg"
              alt="logo"
              style={{ maxHeight: "120px" }}
            />
            <TextField
              fullWidth
              label="Username"
              value={loginData.username}
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, username: e.target.value }))
              }
              sx={{
                "& label.Mui-focused": {
                  color: "#028f41",
                },

                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#028f41",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#028f41",
                  },
                },
              }}
              required
            />
            <OutlinedInput
              fullWidth
              label="Password"
              type={showPasswd ? "text" : "password"}
              value={loginData.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswd(!showPasswd)}
                    edge="end"
                  >
                    {showPasswd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) =>
                setLoginData((prev) => ({ ...prev, password: e.target.value }))
              }
              sx={{
                "& label.Mui-focused": {
                  color: "#028f41",
                },

                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#028f41",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#028f41",
                  },
                },
              }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              onClick={(e) => handleSubmit(e)}
              sx={{
                width: "fit-content",
                alignSelf: "center",
                bgcolor: "#028f41",
                "&:hover": {
                  bgcolor: "#157f1f",
                },
              }}
            >
              Login
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
