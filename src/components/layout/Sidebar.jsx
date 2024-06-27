import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "../styles.css";
import {
  PiBinocularsFill,
  PiCellTowerBold,
  PiShareNetworkBold,
  PiSignOutBold,
  PiUsersThreeBold,
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
      }}
    >
      {label}
    </Button>
  );
}

export default function SideBar() {
  const [selectedItem, setSelectedItem] = useState(
    sessionStorage.getItem("selectedItem")
  );
  const navigate = useNavigate();

  const handleClick = (item) => {
    setSelectedItem(item.key);
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
    const currentIdx = sessionStorage.getItem("selectedItem");
    console.log(selectedItem);
    console.log(currentIdx);
  }, [selectedItem]);

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <img className="image" alt="Image" src="kejagung.svg" />
        <p className="div">Kejaksaan Agung</p>
        <div className="text-wrapper">Republik Indonesia</div>
        <div className="frame">
          <div className="text-wrapper-2">MENU</div>
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
        </div>
      </div>
    </div>
  );
}
