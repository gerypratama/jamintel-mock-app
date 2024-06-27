import * as React from "react";
import Button from "@mui/material/Button";

export default function FilterButton() {
  return (
    <Button
      variant="outlined"
      size="small"
      color="primary"
      sx={{ marginTop: "5px", marginLeft: "10px" }}
    >
      Filter
    </Button>
  );
}
