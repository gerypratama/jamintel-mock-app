import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
  colors,
} from "@mui/material";
import CardGraphVis from "../components/elements/CardGraphVis";
import SelectCard from "../components/elements/SelectCard";
import { useState } from "react";

export default function SocialMedia() {
  const [city, setCity] = useState("");

  return (
    <Stack gap={2} minHeight="100vh" p={3}>
      <Typography variant="h4" pl={2} fontWeight={600} color="#157f1f">
        Social Media Analysis
      </Typography>
      <Grid container spacing={3} p={2} justifyContent="center">
        <Grid item xs={8}>
          <CardGraphVis
            service="informasi-buronan/graph-profil-buron"
            height="600px"
            title="Social Network"
            
            
          />
        </Grid>
        <Grid item xs={4}>
          <Stack gap={3}>
            <SelectCard
              title="City Filter"
              label="Pilih kota"
              value={city}
              onSelectChg={(e) => setCity(e.target.value)}
              itemList={["Jakarta", "Bandung", "Surabaya", "Semarang", "Pati"]}
              
              
            />
            <Card sx={{bgcolor: 'whitesmoke'}}>
              <CardHeader
                title="Content Card"
                titleTypographyProps={{ variant: "h7" }}
                sx={{ fontWeight: 700, color: '#028f41' }}
              />
              <CardContent>
                <Typography>Content coming soon</Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
