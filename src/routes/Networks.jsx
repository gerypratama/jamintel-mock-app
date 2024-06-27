import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import SelectCard from "../components/elements/SelectCard";
import { useEffect, useState } from "react";
import CardGraphVis from "../components/elements/CardGraphVis";
import Cookies from "js-cookie";

export default function Networks() {
  const [buronan, setBuronan] = useState("");
  const [singleData, setSingleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${import.meta.env.VITE_BACKEND_BASE}/oneBuron`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => data && setSingleData(data[0]))
        .catch((err) => alert(err));
    };
    fetchData();
  }, []);

  console.log(singleData);

  return (
    <Stack gap={2} minHeight="100vh" p={3}>
      <Typography variant="h4" pl={2} fontWeight={600} color="#282d33">
        Jaringan Buronan
      </Typography>
      <Grid container spacing={3} p={2} justifyContent="center">
        <Grid item xs={3}>
          <SelectCard
            title="Buronan"
            label="Pilih buronan"
            value={buronan}
            onSelectChg={(e) => setBuronan(e.target.value)}
            itemList={[
              singleData ? singleData.nama : undefined,
              "Buronan 1",
              "Buronan 2",
            ]}
            imgUrl="/harun.jpg"
            data={singleData}
          />
        </Grid>

        <Grid item xs={3}>
          <Card>
            <CardHeader
              title="Keluarga"
              titleTypographyProps={{ variant: "h7" }}
              sx={{ fontWeight: 700, color: "#282d33" }}
            />
            <CardContent>
              <Typography>Content coming soon</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card>
            <CardHeader
              title="Teman"
              titleTypographyProps={{ variant: "h7" }}
              sx={{ fontWeight: 700, color: "#282d33" }}
            />
            <CardContent>
              <Typography>Content coming soon</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card>
            <CardHeader
              title="Rekan Kerja"
              titleTypographyProps={{ variant: "h7" }}
              sx={{ fontWeight: 700, color: "#282d33" }}
            />
            <CardContent>
              <Typography>Content coming soon</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardHeader
              title="Informasi Media Sosial 1"
              titleTypographyProps={{ variant: "h7" }}
              sx={{ fontWeight: 700, color: "#282d33" }}
            />
            <CardContent>
              <Typography>Content coming soon</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardHeader
              title="Informasi Media Sosial 2"
              titleTypographyProps={{ variant: "h7" }}
              sx={{ fontWeight: 700, color: "#282d33" }}
            />
            <CardContent>
              <Typography>Content coming soon</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <CardGraphVis />
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardHeader
              title="Other Data"
              titleTypographyProps={{ variant: "h7" }}
              sx={{ fontWeight: 700, color: "#282d33" }}
            />
            <CardContent>
              <Typography>Content coming soon</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
