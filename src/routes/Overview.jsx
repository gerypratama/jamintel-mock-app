import CardGraphVis from "../components/elements/CardGraphVis";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SelectCard from "../components/elements/SelectCard";
import Cookies from "js-cookie";

export default function Overview() {
  const [buronan, setBuronan] = useState("");
  const [nik, setNik] = useState("");
  const [noRek, setNoRek] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
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
    <Stack gap={2} minHeight="100vh" width="100%" p={3}>
      <Typography variant="h4" pl={2} fontWeight={600} color="#282d33">
        Informasi Buronan
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

        <Grid item xs={9}>
          <CardGraphVis />
        </Grid>

        <Grid item xs={3}>
          <SelectCard
            title="NIK"
            label="Pilih NIK"
            value={nik}
            onSelectChg={(e) => setNik(e.target.value)}
            itemList={[
              singleData ? singleData.nik : undefined,
              "3123456789012341",
              "3123456789012353",
            ]}
          />
        </Grid>

        <Grid item xs={3}>
          <SelectCard
            title="No. Rekening"
            label="Pilih No. Rekening"
            value={noRek}
            onSelectChg={(e) => setNoRek(e.target.value)}
            itemList={[
              singleData ? singleData.no_rekening : undefined,
              "1234567890",
              "1234567891",
            ]}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectCard
            title="No. Telepon"
            label="Pilih No. Telepon"
            value={phoneNumber}
            onSelectChg={(e) => setPhoneNumber(e.target.value)}
            itemList={
              (singleData && singleData.no_hp) || [
                "081234567890",
                "081234567891",
                "081234567893",
              ]
            }
          />
        </Grid>
        <Grid item xs={3}>
          <SelectCard
            title="Email"
            label="Pilih Email"
            value={email}
            onSelectChg={(e) => setEmail(e.target.value)}
            itemList={[
              singleData ? singleData.email : undefined,
              "buron@email.com",
              "buron@email.co",
              "buron@email.co.id",
            ]}
          />
        </Grid>

        <Grid item xs={3}>
          <Card>
            <CardHeader
              title="Panggilan Terakhir"
              titleTypographyProps={{ variant: "h7" }}
            />
            <CardContent>
              <Typography>Content coming soon</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card>
            <CardHeader
              title="Pesan Terakhir"
              titleTypographyProps={{ variant: "h7" }}
            />
            <CardContent>
              <Typography>Content coming soon</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card>
            <CardHeader
              title="Transaksi Terakhir"
              titleTypographyProps={{ variant: "h7" }}
            />
            <CardContent>
              <Typography>Content coming soon</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card>
            <CardHeader
              title="Aktivitas Online Terakhir"
              titleTypographyProps={{ variant: "h7" }}
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
