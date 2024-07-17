import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function SearchBar() {
  const [buronan, setBuronan] = useState([]);
  const [namaBuronan, setNamaBuronan] = useState("");

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_BACKEND_BASE
    }/informasi-buronan/one-buron`;

    // console.log(url);
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        const data = res.data;
        const listBuron = data && data.map((item) => item.nama);
        setBuronan((prev) => [...prev, ...listBuron]);
      })
      .catch((err) => console.log(err));
    // .finally(() => console.log(buronan));
  }, []);

  return (
    <Box bgcolor="#BDCBBF" color="white" p={3}>
      <Container maxWidth="xl">
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
                value={namaBuronan}
                label="Nama buronan"
                onChange={(e) => setNamaBuronan(e.target.value)}
              >
                {buronan.length > 0 &&
                  buronan.map((buron, idx) => (
                    <MenuItem key={idx} value={buron}>
                      {buron}
                    </MenuItem>
                  ))}
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
      </Container>
    </Box>
  );
}
