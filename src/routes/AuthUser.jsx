import Cookies from "js-cookie";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
// import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { navLinks } from "../constants/navLinks";
import { useState } from "react";
import SideBar from "../components/layout/Sidebar";

export default function AuthUser() {
  const [links, setLinks] = useState(navLinks);
  const authSuccess = Cookies.get("token");
  const navigate = useNavigate();

  const handleClick = (key, path) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.key === key
          ? { ...link, isActive: true }
          : { ...link, isActive: false }
      )
    );
    navigate(`/${path}`);
  };

  if (!authSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <Box bgcolor="#B0C2B5">
      <Navbar />
      <Box display="flex">
        <SideBar />
        <Container maxWidth="xl" sx={{ mt: 10 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
