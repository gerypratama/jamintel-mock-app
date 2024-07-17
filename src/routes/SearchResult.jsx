import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { navLinks } from "../constants/navLinks";
import { Outlet, useNavigate } from "react-router-dom";

export default function SearchResult() {
  const [links, setLinks] = useState(navLinks);
  const navigate = useNavigate();
  
  const handleClick = (key, path) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.key === key
          ? { ...link, isActive: true }
          : { ...link, isActive: false }
      )
    );
    navigate(`/info-buronan/${path}`);
  };

 return (
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
                borderBottomColor: link.isActive ? "currentcolor" : "#33714E",
              },
            }}
          >
            {link.label}
          </Button>
        ))}
      </Stack>
      <Outlet />
    </Stack>
  );
}
