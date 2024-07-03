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
// import Cookies from "js-cookie";
import CardTable from "../components/elements/CardTable";
import { buronan } from "../components/dummyFugitives";
import CardTableTrack from "../components/elements/CardTableTrack";
import RelativeTableCard from "../components/elements/RelativeTableCard";

export default function Networks() {
  const [nama, setNama] = useState(buronan[0].name);
  const [singleData, setSingleData] = useState(buronan[0]);
  const listBuronan = buronan.map((item) => item.name);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetch(
  //       `${import.meta.env.VITE_BACKEND_BASE}/informasi-buronan/one-buron`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${Cookies.get("token")}`,
  //         },
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((data) => data && setSingleData(data[0]))
  //       .catch((err) => alert(err));
  //   };
  //   fetchData();
  // }, []);

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

  useEffect(() => {
    const currentData = buronan.filter((item) => item.name === nama);
    setSingleData(currentData[0]);
  }, [nama]);

  console.log(singleData);

  return (
    <Stack gap={2} minHeight="100vh" p={3}>
      <Typography variant="h4" pl={2} fontWeight={600} color="#157f1f">
        Jaringan Buronan
      </Typography>
      <Grid container spacing={3} p={2} justifyContent="center">
        <Grid item xs={4}>
          <SelectCard
            title="Buronan"
            label="Pilih buronan"
            value={nama}
            onSelectChg={(e) => setNama(e.target.value)}
            itemList={listBuronan}
            imgUrl={singleData.photoUrl}
            data={singleData}
          />
        </Grid>

        <Grid item xs={8}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={4}>
              <RelativeTableCard
                data={singleData.relatives.filter(
                  (item) => item.relationship === "Family"
                )}
                title="Keluarga"
              />
            </Grid>

            <Grid item xs={4}>
              <RelativeTableCard
                data={singleData.relatives.filter(
                  (item) => item.relationship === "Friend"
                )}
                title="Teman"
              />
            </Grid>

            <Grid item xs={4}>
              <RelativeTableCard
                data={singleData.relatives.filter(
                  (item) => item.relationship === "Colleague"
                )}
                title="Rekan"
              />
            </Grid>

            <Grid item xs={6}>
              <Card sx={{bgcolor: 'whitesmoke'}}>
                <CardHeader
                  title="Informasi Media Sosial 1"
                  titleTypographyProps={{ variant: "h7" }}
                  sx={{ fontWeight: 700, color: '#028f41' }}
                />
                <CardContent>
                  <Typography>Content coming soon</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Card sx={{bgcolor: 'whitesmoke'}}>
                <CardHeader
                  title="Informasi Media Sosial 2"
                  titleTypographyProps={{ variant: "h7" }}
                  sx={{ fontWeight: 700, color: '#028f41' }}
                />
                <CardContent>
                  <Typography>Content coming soon</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <CardGraphVis
                service="informasi-buronan/graph-profil-buron"
                height="500px"
                title="Graph Network"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}
