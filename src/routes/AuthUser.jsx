import Cookies from "js-cookie";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { navLinks } from "../constants/navLinks";
import { useState } from "react";

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
      <Container maxWidth="xl" sx={{ mt: 18, pt: 3 }}>
        <Stack>
          <Stack direction="row" px={1} gap={1}>
            {links.map((link) => (
              <Button
                key={link.key}
                onClick={() => handleClick(link.key, link.path)}
                sx={{
                  borderRadius: 0,
                  borderBottom: `4px solid ${
                    link.isActive ? "#353229" : "transparent"
                  }`,
                  color: link.isActive ? "currentcolor" : "#33714E",
                  fontWeight: link.isActive ? 700 : 500,
                  "&:hover": {
                    bgcolor: "transparent",
                    borderBottomColor: link.isActive
                      ? "currentcolor"
                      : "#33714E",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Stack>
          <Outlet />
        </Stack>
      </Container>
    </Box>
  );
}
