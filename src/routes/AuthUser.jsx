import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import {
  Box,
  Container,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { PiListBold, PiXBold } from "react-icons/pi";
import { useEffect, useState } from "react";

export default function AuthUser() {
  const [isOpen, setisOpen] = useState(false);
  const authSuccess = Cookies.get("token");

  if (!authSuccess) {
    return <Navigate to="/login" />;
  }

  // useEffect(() => {
  //   console.log(isOpen);
  // }, [isOpen]);

  return (
    <div style={{ backgroundColor: "#e0e1da", width: "100%" }}>
      <IconButton onClick={() => setisOpen(true)} sx={{position: 'fixed', top: 10, left: 20}}>
        <PiListBold />
      </IconButton>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          width="5vw"
          minHeight="100vh"
          bgcolor="whitesmoke"
          p={3}
        ></Box>
        <Drawer open={isOpen} onClose={() => setisOpen(false)}>
          <Sidebar
            onClose={() => setisOpen(false)}
            onOutClick={() => setisOpen(false)}
          />
        </Drawer>
        {/* <Sidebar /> */}
        <div
          style={{
            width: "100%",
          }}
        >
          {/* <Navbar /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
