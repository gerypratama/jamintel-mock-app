import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import DashCard from "../components/elements/DashCard";

export default function Dashboard() {
  return (
    <Stack gap={2} px={2}>
      <Typography fontSize={36} fontWeight={700} color="#353229">
        Beranda
      </Typography>
      <Stack direction="row" alignItems="center" gap={1} alignSelf="flex-end">
        <DatePicker
          label={"Tanggal mulai"}
          views={["day", "month", "year"]}
          sx={{ bgcolor: "white", borderRadius: 2 }}
        />
        <Typography variant="subtitle">s/d</Typography>
        <DatePicker
          label={"Tanggal selesai"}
          views={["day", "month", "year"]}
          sx={{ bgcolor: "white", borderRadius: 2 }}
        />
      </Stack>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={5}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <DashCard
                bgCol="#33714E"
                txtCol="white"
                title="Total Tersangka"
                content="4000"
              />
            </Grid>
            <Grid item xs={6}>
              <DashCard
                bgCol="#519A62"
                txtCol="white"
                title="Tersangka Buron"
                content="3568"
              />
            </Grid>
            <Grid item xs={6}>
              <DashCard
                bgCol="#519A62"
                txtCol="white"
                title="Tersangka Tertangkap"
                content="432"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Card sx={{ minHeight: 424 }}>
            <CardHeader
              titleTypographyProps={{ variant: "h7" }}
              title="Peta Persebaran Buronan"
              sx={{
                fontWeight: 700,
                color: "353229",
              }}
            />
            <CardMedia
              component="img"
              height="250"
              image="/id_map.svg"
              alt={"map"}
              sx={{ objectFit: "contain" }}
            />
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
