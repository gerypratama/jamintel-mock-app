import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import capitalizeStr from "../../utils/capitalizeStr";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function RelativeTableCard({ service, title }) {
const [data, setData] = useState(null)

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_BACKEND_BASE
    }/jaringan-buronan/${service}`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        const list = res.data;
        setData(list);
      })
      .catch((err) => console.log(err))
      .finally(() => console.log(data));
  }, []);

  const headers = data && Object.keys(data[0]);
  return (
    <Card sx={{ bgcolor: "#33714E" }}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: "h7" }}
        sx={{ fontWeight: 700, color: "white" }}
      />
      <CardContent sx={{ p: 2, overflowX: "scroll", maxHeight: 300 }}>
        <Table>
          <TableHead>
            <TableRow>
              {headers &&
                headers.map((header, idx) => (
                  <TableCell
                    key={idx}
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      textWrap: "nowrap",
                    }}
                  >
                    {capitalizeStr(header)}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item, idx) => (
                <TableRow key={idx}>
                  {Object.values(item).map((value, idx) => (
                    <TableCell key={idx} sx={{ color: "white" }}>
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
