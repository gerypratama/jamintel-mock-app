import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
  colors,
} from "@mui/material";
import SelectCard from "../components/elements/SelectCard";
import { useEffect, useState } from "react";
import CardGraphVis from "../components/elements/CardGraphVis";
import Cookies from "js-cookie";
import CardTable from "../components/elements/CardTable";
import { buronan } from "../components/dummyFugitives";
import CardTableTrack from "../components/elements/CardTableTrack";
import RelativeTableCard from "../components/elements/RelativeTableCard";
import axios from "axios";
import ProfileCard from "../components/elements/ProfileCard";

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
      .catch((err) => console.log(err))
      .finally(() => console.log(singleData));
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch(
  //       `${import.meta.env.VITE_BACKEND_BASE}/informasi-buronan/phone-call`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${Cookies.get("token")}`,
  //         },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => console.log(data))
  //       .catch((err) => alert(err));
  //   };
  //   fetchData();
  // }, []);

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
            title="Graph Network"
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
          <Card sx={{ bgcolor: "whitesmoke" }}>
            <CardHeader
              title="Informasi Media Sosial 1"
              titleTypographyProps={{ variant: "h7" }}
              sx={{ fontWeight: 700, color: "#028f41" }}
            />
            <CardContent>
              <Typography>Content coming soon</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card sx={{ bgcolor: "whitesmoke" }}>
            <CardHeader
              title="Informasi Media Sosial 2"
              titleTypographyProps={{ variant: "h7" }}
              sx={{ fontWeight: 700, color: "#028f41" }}
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
