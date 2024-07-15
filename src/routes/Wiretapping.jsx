import CardGraphVis from "../components/elements/CardGraphVis";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SelectCard from "../components/elements/SelectCard";
import CardMap from "../components/elements/CardMap";

export default function Wiretapping() {
  return (
    <Stack gap={2} minHeight="100vh">
      <Grid container spacing={3} p={2} justifyContent="center">
        <Grid item xs={8}>
          <CardGraphVis
            service="perjalanan-buronan/suspect-journey"
            height="400px"
            title="Graph Network"
          />
        </Grid>
        <Grid item xs={4}>
          <Stack gap={3}>
            <SelectCard
              title="Data Filter"
              label="Pilih filter"
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
