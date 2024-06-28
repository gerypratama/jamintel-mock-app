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
    <Stack gap={2} minHeight="100vh" p={3}>
      <Typography variant="h4" pl={2} fontWeight={600} color="#282d33">
        Wiretapping
      </Typography>
      <Grid container spacing={3} p={2} justifyContent="center">
        <Grid item xs={8}>
          <CardMap />
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
            <Card>
              <CardHeader
                title="Suspected Numbers"
                titleTypographyProps={{ variant: "h7" }}
                sx={{ fontWeight: 700, color: colors.blue.A400 }}
              />
              <CardContent>
                <Typography>Content coming soon</Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <CardGraphVis
            service="informasi-buronan/graph-profil-buron"
            height="600px"
            title="Graph Network"
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
