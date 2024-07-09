import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SearchBar from "../elements/SearchBar";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar sx={{ bgcolor: "#33714E", boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={1}
          px={3}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <img src="/kejagung.svg" alt="logo" style={{ height: 36 }} />
            <Typography
              color="white"
              fontSize={30}
              fontWeight={600}
              fontFamily="Barlow"
            >
              JAMINTEL
            </Typography>
          </Stack>
          <IconButton
            id="basic-button"
            aria-controls={openMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <FaUserCircle color="white" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Container>
      <SearchBar />
    </AppBar>
  );
}
