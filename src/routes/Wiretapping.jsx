import CardGraphVis from "../components/elements/CardGraphVis";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
  colors,
} from "@mui/material";
import { useState } from "react";
import SelectCard from "../components/elements/SelectCard";
import CardMap from "../components/elements/CardMap";

export default function Wiretapping() {
  const [data, setData] = useState("");

  return (
    <Stack gap={2} minHeight="100vh">
      <Grid container spacing={3} p={2} justifyContent="center">
        <Grid item xs={8}>
          <CardGraphVis
            service="informasi-buronan/graph-profil-buron??nik=3174010102700009&no_hp=081181234455&no_rek=2907991604&start_date=2020-01&end_date=2021-12&email1=harunmasiku@example.com&n_kontak1=086899169400&tgl_cctv=2020-11-23"
            height="400px"
            title="Graph Network"
          />
        </Grid>
        <Grid item xs={4}>
          <Stack gap={3}>
            <SelectCard
              title="Data Filter"
              label="Pilih filter"
              value={data}
              onSelectChg={(e) => setData(e.target.value)}
              itemList={["Filter 1", "Filter 2", "Filter 3"]}
            />
            <Card sx={{ bgcolor: "whitesmoke" }}>
              <CardHeader
                title="Suspected Numbers"
                titleTypographyProps={{ variant: "h7" }}
                sx={{ fontWeight: 700, color: "#028f41" }}
              />
              <CardContent>
                <Typography>Content coming soon</Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <CardMap />
        </Grid>
      </Grid>
    </Stack>
  );
}
