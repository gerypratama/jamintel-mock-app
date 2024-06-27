import { Box } from "@mui/material";
import Datepicker from "../elements/Datepicker";
import FilterButton from "../elements/FilterButton";
import MenuCetak from "../elements/MenuCetak";

export default function Navbar() {
  return (
    <Box className="navbar" py={2}>
      <div>
        <Datepicker />
        <FilterButton />
      </div>
      <MenuCetak />
    </Box>
  );
}
