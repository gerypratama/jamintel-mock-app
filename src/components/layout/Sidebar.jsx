import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {
  AssignmentInd,
  AssignmentOutlined,
  GridView,
  InsertChartOutlined,
} from "@mui/icons-material";

const MENU_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: <GridView />, path: "" },
  {
    key: "info",
    label: "Informasi Buronan",
    icon: <AssignmentInd />,
    path: "info-buronan/overview",
  },
  {
    key: "laporan",
    label: "Laporan",
    icon: <InsertChartOutlined />,
    path: "",
  },
  {
    key: "dokumen",
    label: "Dokumen",
    icon: <AssignmentOutlined />,
    path: "",
  },
];

function MenuItem({ isActive, icon, onClick }) {
  return (
    <Button
      variant={isActive ? "contained" : "text"}
      size="large"
      onClick={onClick}
      sx={{
        width: "100%",
        textTransform: "capitalize",
        py: 1.5,
        color: isActive ? "#E4C64D" : "white",
        bgcolor: "transparent",
        "&:hover": {
          bgcolor: "transparent",
          color: "#E4C64D",
        },
      }}
    >
      {icon}
    </Button>
  );
}

export default function SideBar({ onOutClick }) {
  const [selectedItem, setSelectedItem] = useState(
    sessionStorage.getItem("selectedItem")
  );
  const navigate = useNavigate();

  const handleClick = (item) => {
    setSelectedItem(item.key);
    navigate(`/${item.path}`);
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
    <Box width={120} bgcolor="#33714ECC" minHeight="100vw">
      <Stack gap={2} position="sticky" top={80}>
        {MENU_ITEMS.map((menu) => (
          <MenuItem
            key={menu.key}
            isActive={selectedItem === menu.key}
            icon={menu.icon}
            onClick={() => handleClick(menu)}
          />
        ))}
      </Stack>
    </Box>
  );
}
