import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import CardGraphVis from "../components/elements/CardGraphVis";
import Cookies from "js-cookie";
import RelativeTableCard from "../components/elements/RelativeTableCard";
import axios from "axios";
import ProfileCard from "../components/elements/ProfileCard";
import CardTable from "../components/elements/CardTable";

export default function Networks() {
  const [singleData, setSingleData] = useState(null);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_BACKEND_BASE
    }/informasi-buronan/one-buron`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        const data = res.data;
        setSingleData(data[0]);
      })
      .catch((err) => console.log(err));
    // .finally(() => console.log(singleData));
  }, []);

  return (
    <Stack gap={2} minHeight="100vh">
      <Grid container spacing={3} p={2} justifyContent="center">
        <Grid item xs={3}>
          {singleData && <ProfileCard data={singleData} />}
        </Grid>

        <Grid item xs={9}>
          <CardGraphVis
            service="jaringan-buronan/graph-network-buron?buron=Harun%20Masiku&platform=instagram"
            height="532px"
            title="Jaringan Buronan"
          />
        </Grid>
        <Grid item xs={4}>
          <RelativeTableCard service="keluarga-buron" title="Keluarga" />
        </Grid>

        <Grid item xs={4}>
          <RelativeTableCard service="teman-buron" title="Teman" />
        </Grid>

        <Grid item xs={4}>
          <RelativeTableCard service="rekan-buron" title="Rekan" />
        </Grid>

        <Grid item xs={6}>
          <CardTable
            service="jaringan-buronan/list-sosmed?nama_buron=Harun%20Masiku&nama_kontak=Tomas%20Masiku"
            title="Informasi Media Sosial"
          />
        </Grid>

        <Grid item xs={6}>
          <CardTable
            service="jaringan-buronan/followers-sosmed?nama_buron=Harun%20Masiku&kel1=Tomas%20Masiku&platform=instagram"
            title="Followers/Following Media Sosial"
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
