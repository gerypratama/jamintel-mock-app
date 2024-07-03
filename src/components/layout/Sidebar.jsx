import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import {
  PiBinocularsFill,
  PiCellTowerBold,
  PiShareNetworkBold,
  PiSignOutBold,
  PiUsersThreeBold,
  PiXBold,
} from "react-icons/pi";
import { Button } from "@mui/material";

const MENU_ITEMS = [
  { key: "overview", label: "Overview", icon: <PiBinocularsFill />, path: "" },
  {
    key: "jaringan",
    label: "Network",
    icon: <PiShareNetworkBold />,
    path: "network",
  },
  {
    key: "penyadapan",
    label: "Wiretapping",
    icon: <PiCellTowerBold />,
    path: "wiretapping",
  },
  {
    key: "medsos",
    label: "Social Media",
    icon: <PiUsersThreeBold />,
    path: "socmed",
  },
];

function MenuItem({ isActive, label, icon, onClick }) {
  return (
    <Button
      variant={isActive ? "contained" : "text"}
      startIcon={icon}
      size="large"
      onClick={onClick}
      sx={{
        width: "100%",
        justifyContent: "start",
        textTransform: "capitalize",
        py: 1.5,
        color: isActive ? "whitesmoke" : "#028f41",
        bgcolor: isActive ? "#157f1f" : "transparent",
        "&:hover": {
          bgcolor: "#4cb963",
          color: "whitesmoke",
        },
      }}
    >
      {label}
    </Button>
  );
}

export default function SideBar({ onClose, onOutClick }) {
  const [selectedItem, setSelectedItem] = useState(
    sessionStorage.getItem("selectedItem")
  );
  const navigate = useNavigate();

  const handleClick = (item) => {
    setSelectedItem(item.key);
    onOutClick();
    navigate(`/${item.path}`);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (!selectedItem) {
      setSelectedItem(MENU_ITEMS[0].key);
    }
  }, []);

  useEffect(() => {
    selectedItem && sessionStorage.setItem("selectedItem", selectedItem);
  }, [selectedItem]);

  return (
    <Box p={3} width="18vw" position="relative">
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        <PiXBold size={24} />
      </IconButton>
      <Stack gap={5} alignItems="center" mt={8}>
        <Stack gap={1} alignItems="center">
          <img
            src="kejagung.svg"
            alt="logo kejagung"
            style={{ height: 133, objectFit: "contain" }}
          />
          <Typography
            variant="h5"
            color="#058039"
            fontWeight={600}
            fontFamily="Roboto"
          >
            Kejaksaan Agung
          </Typography>
          <Typography
            variant="h6"
            color="#058039"
            fontWeight={600}
            fontFamily="Roboto"
          >
            Republik Indonesia
          </Typography>
        </Stack>
        <Stack width="100%" gap={1}>
          {MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.key}
              isActive={selectedItem === item.key}
              label={item.label}
              icon={item.icon}
              onClick={() => handleClick(item)}
            />
          ))}
          <MenuItem
            isActive={selectedItem === MENU_ITEMS.length}
            label="Logout"
            icon={<PiSignOutBold />}
            onClick={handleLogout}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
