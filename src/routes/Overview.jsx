import CardGraphVis from "../components/elements/CardGraphVis";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
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
import capitalizeStr from "../utils/capitalizeStr";
import ProfileCard from "../components/elements/ProfileCard";
import StyledCard from "../components/elements/StyledCard";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

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
  const [dates, setDates] = useState({
    start: null || dayjs("2020-01-01"),
    end: null || dayjs("2023-12-31"),
  });
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

  useEffect(() => {
    console.log(dayjs(dates.start).month() + 1, dayjs(dates.start).year());
    console.log(dayjs(dates.end).month() + 1, dayjs(dates.end).year());
  }, [dates]);

  return (
    <Stack gap={2} minHeight="100vh" width="100%">
      <Grid container spacing={3} p={2} columns={12} justifyContent="center">
        <Grid item xs={3}>
          {singleData && <ProfileCard data={singleData} />}
        </Grid>

        <Grid item xs={7}>
          <Stack gap={2}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <StyledCard title={"Start Date"}>
                  <DatePicker
                    label={"Pick date"}
                    views={["month", "year"]}
                    value={dates.start}
                    onChange={(newValue) =>
                      setDates((prev) => ({ ...prev, start: newValue }))
                    }
                    sx={{ bgcolor: "white" }}
                  />
                </StyledCard>
              </Grid>
              <Grid item xs={6}>
                <StyledCard title={"End Date"}>
                  <DatePicker
                    label={"Pick date"}
                    views={["month", "year"]}
                    value={dates.end}
                    onChange={(newValue) =>
                      setDates((prev) => ({ ...prev, end: newValue }))
                    }
                    sx={{ bgcolor: "white" }}
                  />
                </StyledCard>
              </Grid>
            </Grid>
            <CardGraphVis
              service="informasi-buronan/graph-profil-buron?nik=3174010102700009&no_hp=081181234455&no_rek=2907991604&start_date=2020-01&end_date=2021-12&email1=harunmasiku@example.com&n_kontak1=086899169400&tgl_cctv=2020-11-23"
              height="462px"
              title="Profil Buronan"
            />
          </Stack>
        </Grid>

        <Grid item xs={2}>
          <Stack gap={2}>
            <SelectCard
              title="NIK"
              label="Pilih NIK"
              value={nik}
              onSelectChg={(e) => setNik(e.target.value)}
              itemList={singleData.identity_number}
              bgCol="#33714E"
              txtCol="white"
              headerCol="white"
            />
            <SelectCard
              title="No. Kontak"
              label="Pilih No. Kontak"
              value={phoneNumber}
              onSelectChg={(e) => setPhoneNumber(e.target.value)}
              itemList={singleData.phone_number}
              bgCol="#33714E"
              txtCol="white"
              headerCol="white"
            />
            <SelectCard
              title="Email"
              label="Pilih Email"
              value={email}
              onSelectChg={(e) => setEmail(e.target.value)}
              itemList={singleData.email}
              bgCol="#33714E"
              txtCol="white"
              headerCol="white"
            />
            <SelectCard
              title="No. Rekening"
              label="Pilih No. Rekening"
              value={noRek}
              onSelectChg={(e) => setNoRek(e.target.value)}
              itemList={singleData.acc_number}
              bgCol="#33714E"
              txtCol="white"
              headerCol="white"
            />
          </Stack>
        </Grid>

        {/* <Grid item xs={8}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <CardGraphVis
                service="informasi-buronan/graph-profil-buron?nik=3174010102700009&no_hp=081181234455&no_rek=2907991604&start_date=2020-01&end_date=2021-12&email1=harunmasiku@example.com&n_kontak1=086899169400&tgl_cctv=2020-11-23"
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
        </Grid> */}
      </Grid>
    </Stack>
  );
}
