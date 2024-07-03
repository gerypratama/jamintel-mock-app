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
import { useEffect, useState } from "react";
import SelectCard from "../components/elements/SelectCard";
// import Cookies from "js-cookie";
import { buronan } from "../components/dummyFugitives";
import { dummyCalls } from "../components/dummyCalls";
import CardTableTrack from "../components/elements/CardTableTrack";
import { logNik } from "../components/dummyIdLog";
import { trx } from "../components/dummyTrx";
import { onlineLog } from "../components/dummyOnlineLog";

export default function Overview() {
  const [nama, setNama] = useState(buronan[0].name);
  const [nik, setNik] = useState(buronan[0].identity_number[0]);
  const [noRek, setNoRek] = useState(buronan[0].acc_number[0]);
  const [phoneNumber, setPhoneNumber] = useState(buronan[0].phone_number[0]);
  const [email, setEmail] = useState(buronan[0].email[0]);
  const [singleData, setSingleData] = useState(buronan[0]);
  const [callData, setCallData] = useState(
    dummyCalls.filter((item) => item.caller_number === phoneNumber)
  );
  const [idData, setIdData] = useState(
    logNik.filter((item) => item.person_national_id === nik)
  );
  const [trxData, setTrxData] = useState(
    trx.filter((item) => item.acc_number === noRek)
  );
  const [onlineData, setOnlineData] = useState(
    onlineLog.filter((item) => item.email_address === email)
  );
  const listBuronan = buronan.map((item) => item.name);

  useEffect(() => {
    const currentData = buronan.filter((item) => item.name === nama);
    setSingleData(currentData[0]);
    setPhoneNumber(currentData[0].phone_number[0]);
    setNik(currentData[0].identity_number[0]);
    setNoRek(currentData[0].acc_number[0]);
    setEmail(currentData[0].email[0]);
  }, [nama]);

  useEffect(() => {
    const currentData = dummyCalls.filter(
      (item) => item.caller_number === phoneNumber
    );
    setCallData(currentData[0]);
  }, [phoneNumber]);

  useEffect(() => {
    const currentData = logNik.filter(
      (item) => item.person_national_id === nik
    );
    setIdData(currentData[0]);
  }, [nik]);

  useEffect(() => {
    const currentData = trx.filter(
      (item) => item.bank_account_number === noRek
    );
    setTrxData(currentData[0]);
  }, [noRek]);

  useEffect(() => {
    const currentData = onlineLog.filter(
      (item) => item.email_address === email
    );
    setOnlineData(currentData[0]);
  }, [email]);

  return (
    <Stack gap={2} minHeight="100vh" width="100%" p={3}>
      <Typography variant="h4" pl={2} fontWeight={600} color="#157f1f">
        Informasi Buronan
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
            <Grid item xs={12}>
              <CardGraphVis
                service="informasi-buronan/graph-profil-buron"
                height="468px"
                title="Profil Buronan"
              />
            </Grid>
            <Grid item xs={6}>
              <CardTableTrack
                data={callData && callData.calls}
                title="Panggilan Terakhir"
                label="Pilih No. Telepon"
                source={phoneNumber}
                onSelectChg={(e) => setPhoneNumber(e.target.value)}
                srcList={singleData.phone_number}
              />
            </Grid>

            <Grid item xs={6}>
              <CardTableTrack
                data={idData && idData.logs}
                title="Rekam Jejak"
                label="Pilih NIK"
                source={nik}
                onSelectChg={(e) => setNik(e.target.value)}
                srcList={singleData.identity_number}
              />
            </Grid>

            <Grid item xs={6}>
              <CardTableTrack
                data={trxData && trxData.transactions}
                title="Transaksi Terakhir"
                label="Pilih No. Rekening"
                source={noRek}
                onSelectChg={(e) => setNoRek(e.target.value)}
                srcList={singleData.acc_number}
              />
            </Grid>

            <Grid item xs={6}>
              <CardTableTrack
                data={onlineData && onlineData.service_logs}
                title="Aktivitas Online Terakhir"
                label="Pilih Email"
                source={email}
                onSelectChg={(e) => setEmail(e.target.value)}
                srcList={singleData.email}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
}
