import Cookies from "js-cookie";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { Box, Button, Container, Stack } from "@mui/material";
import { navLinks } from "../constants/navLinks";

export default function AuthUser() {
  const authSuccess = Cookies.get("token");
  const navigate = useNavigate();

  if (!authSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <Box width="100vw" bgcolor="#B0C2B5">
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 20 }}>
        <Stack>
          <Stack direction="row">
            {navLinks.map((link) => (
              <Button
                key={link.key}
                onClick={() => navigate(`/${link.path}`)}
                sx={{
                  border: "3px solid transparent",
                  color: "#33714E",
                  "&:hover": {
                    bgcolor: "transparent",
                    borderBottomColor: "#33714E",
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
