import {
  AppBar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
    <Stack>
      <AppBar sx={{ bgcolor: "#33714E", boxShadow: "none" }}>
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
        <Box bgcolor="#BDCBBF" color="white" p={3}>
          <Grid
            container
            columns={16}
            // gap={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12}>
              <FormControl size="small" fullWidth sx={{ bgcolor: "white" }}>
                <InputLabel id="select-buron-label">Pilih Buronan</InputLabel>
                <Select
                  labelId="select-buron-label"
                  id="select-buron"
                  // value={age}
                  label="Nama buronan"
                  // onChange={handleChange}
                >
                  <MenuItem sx={{ bgcolor: "transparent" }}>Ten</MenuItem>
                  <MenuItem sx={{ bgcolor: "transparent" }}>Twenty</MenuItem>
                  <MenuItem sx={{ bgcolor: "transparent" }}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 600,
                  color: "#353229",
                  bgcolor: "#E4C64D",
                  "&:hover": { bgcolor: "#F6EFC5" },
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </AppBar>
    </Stack>
  );
}
