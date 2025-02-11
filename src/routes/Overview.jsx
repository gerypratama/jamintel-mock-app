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
import CardTable from "../components/elements/CardTable";

export default function Overview() {
  const [singleData, setSingleData] = useState(null);
  const [serviceUrl, setServiceUrl] = useState(
    "informasi-buronan/graph-profil-buron?nik=3174010102700009&no_hp=081181234455&no_rek=2907991604&start_date=2020-01&end_date=2021-12&email1=harunmasiku@example.com&n_kontak1=086899169400&tgl_cctv=2020-11-23"
  );
  const [dates, setDates] = useState({
    start: dayjs("2020-01-01"),
    end: dayjs("2020-12-31"),
  });
  const [graphParams, setGraphParams] = useState({
    nik: "",
    no_hp: "",
    no_rek: "",
    email: "",
    tgl_cctv: "2020-11-23",
    start_date: `${dayjs(dates.start).format("YYYY-MM")}`,
    end_date: `${dayjs(dates.end).format("YYYY-MM")}`,
  });
  const [tableUrl, setTableUrl] = useState({
    nik: `nik-web?nik=${
      graphParams.nik !== "" ? graphParams.nik : "3174010102700009"
    }`,
    no_hp: `phone-call?no_hp=${
      graphParams.no_hp !== "" ? graphParams.no_hp : "3174010102700009"
    }&start_date=${graphParams.start_date}&end_date=${graphParams.end_date}`,
    email: `website?email=${
      graphParams.email !== "" ? graphParams.email : "harunmasiku@example.com"
    }`,
    no_rek: `transaksi-bank?no_rek=${
      graphParams.no_rek !== "" ? graphParams.no_rek : "2907991604"
    }`,
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
      start_date: `${dayjs(dates.start).format("YYYY-MM")}`,
      end_date: `${dayjs(dates.end).format("YYYY-MM")}`,
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

    setTableUrl((prev) => ({
      ...prev,
      nik: `nik-web?nik=${
        graphParams.nik !== "" ? graphParams.nik : "3174010102700009"
      }`,
      no_hp: `phone-call?no_hp=${
        graphParams.no_hp !== "" ? graphParams.no_hp : "3174010102700009"
      }&start_date=${graphParams.start_date}&end_date=${graphParams.end_date}`,
      email: `website?email=${
        graphParams.email !== "" ? graphParams.email : "harunmasiku@example.com"
      }`,
      no_rek: `transaksi-bank?no_rek=${
        graphParams.no_rek !== "" ? graphParams.no_rek : "2907991604"
      }`,
    }));
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
              id="tes1"
              service={serviceUrl}
              height="490px"
              title="Profil Buronan"
            />
          </Stack>
        </Grid>
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
        <Grid item xs={6}>
          <CardTable
            title="Kemunculan NIK di Internet"
            service={`informasi-buronan/${tableUrl.nik}`}
          />
        </Grid>

        <Grid item xs={6}>
          <CardTable
            title="Riwayat Kontak"
            service={`informasi-buronan/${tableUrl.no_hp}`}
          />
        </Grid>

        <Grid item xs={6}>
          <CardTable
            title="Kemunculan Email di Internet"
            service={`informasi-buronan/${tableUrl.email}`}
          />
        </Grid>

        <Grid item xs={6}>
          <CardTable
            title="Riwayat Transaksi"
            service={`informasi-buronan/${tableUrl.no_rek}`}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
