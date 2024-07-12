import CardGraphVis from "../components/elements/CardGraphVis";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import SelectCard from "../components/elements/SelectCard";
import Cookies from "js-cookie";
import ProfileCard from "../components/elements/ProfileCard";
import StyledCard from "../components/elements/StyledCard";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import axios from "axios";

export default function Overview() {
  const [singleData, setSingleData] = useState(null);
  const [serviceUrl, setServiceUrl] = useState(
    "informasi-buronan/graph-profil-buron?nik=3174010102700009&no_hp=081181234455&no_rek=2907991604&start_date=2020-01&end_date=2021-12&email1=harunmasiku@example.com&n_kontak1=086899169400&tgl_cctv=2020-11-23"
  );
  const [dates, setDates] = useState({
    start: dayjs("2020-01-01"),
    end: dayjs("2021-12-31"),
  });
  const [graphParams, setGraphParams] = useState({
    nik: "",
    no_hp: "",
    no_rek: "",
    email: "",
    tgl_cctv: "2020-11-23",
    start_date: `${dayjs(dates.start).year().toString()}-${(
      dayjs(dates.start).month() + 1
    ).toString()}`,
    end_date: `${dayjs(dates.end).year().toString()}-${(
      dayjs(dates.end).month() + 1
    ).toString()}`,
  });

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

  useEffect(() => {
    if (singleData) {
      setGraphParams((prev) => ({
        ...prev,
        nik: singleData.nik,
        no_hp: singleData.no_hp[0],
        no_rek: singleData.no_rekening,
        email: singleData.email[0],
      }));
    }
  }, [singleData]);

  useEffect(() => {
    setGraphParams((prev) => ({
      ...prev,
      start_date: `${dayjs(dates.start).year().toString()}-${(
        dayjs(dates.start).month() + 1
      ).toString()}`,
      end_date: `${dayjs(dates.end).year().toString()}-${(
        dayjs(dates.end).month() + 1
      ).toString()}`,
    }));
  }, [dates]);

  useEffect(() => {
    // console.log(graphParams);
    let url = "informasi-buronan/graph-profil-buron?";
    const params = Object.entries(graphParams);
    const firstParams = params[1];
    url += `${firstParams[0]}=${firstParams[1]}`;
    params.forEach(([key, value]) => {
      if (url.includes(`${key}=${value}`)) {
        return;
      }
      url += `&${key}=${value}`;
    });
    setServiceUrl(url);
  }, [graphParams]);

  return (
    <Stack minHeight="100vh" width="100%">
      <Grid container spacing={3} p={2} justifyContent="center">
        <Grid item xs={4}>
          {singleData && <ProfileCard data={singleData} />}
        </Grid>

        <Grid item xs={8}>
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
                    sx={{ width: "100%", bgcolor: "white" }}
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
                    sx={{ width: "100%", bgcolor: "white" }}
                  />
                </StyledCard>
              </Grid>
            </Grid>
            <CardGraphVis
              service={serviceUrl}
              height="490px"
              title="Profil Buronan"
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
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={3}>
          <SelectCard
            title="NIK"
            label="Pilih NIK"
            value={graphParams.nik}
            onSelectChg={(e) =>
              setGraphParams((prev) => ({ ...prev, nik: e.target.value }))
            }
            itemList={singleData && singleData.nik}
            bgCol="#33714E"
            txtCol="white"
            headerCol="white"
          />
        </Grid>
        <Grid item xs={3}>
          <SelectCard
            title="No. Kontak"
            label="Pilih No. Kontak"
            value={graphParams.no_hp}
            onSelectChg={(e) =>
              setGraphParams((prev) => ({ ...prev, no_hp: e.target.value }))
            }
            itemList={singleData && singleData.no_hp}
            bgCol="#33714E"
            txtCol="white"
            headerCol="white"
          />
        </Grid>
        <Grid item xs={3}>
          <SelectCard
            title="Email"
            label="Pilih Email"
            value={graphParams.email}
            onSelectChg={(e) =>
              setGraphParams((prev) => ({ ...prev, email: e.target.value }))
            }
            itemList={singleData && singleData.email}
            bgCol="#33714E"
            txtCol="white"
            headerCol="white"
          />
        </Grid>
        <Grid item xs={3}>
          <SelectCard
            title="No. Rekening"
            label="Pilih No. Rekening"
            value={graphParams.no_rek}
            onSelectChg={(e) =>
              setGraphParams((prev) => ({ ...prev, no_rek: e.target.value }))
            }
            itemList={singleData && singleData.no_rekening}
            bgCol="#33714E"
            txtCol="white"
            headerCol="white"
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
