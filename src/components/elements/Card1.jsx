import { useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";

export default function Card1({ title, service }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_BASE}/${service}`)
      .then((res) => res.json())
      .then((data) => setResult(data));
  }, []);

  return (
    <Card
      className="cardbiru"
      sx={{ width: "100%", maxHeight: "20vh", bgcolor: "#058039" }}
    >
      <Typography align="center" color="white" fontSize="20px" fontWeight={600}>
        {title}
      </Typography>
      <Typography align="center" color="white" fontSize="24px" fontWeight="300">
        {result}
      </Typography>
    </Card>
  );
}
