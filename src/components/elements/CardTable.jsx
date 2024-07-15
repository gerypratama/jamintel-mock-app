import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import capitalizeStr from "../../utils/capitalizeStr";
import axios from "axios";

export default function CardTable({ service, title }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_BACKEND_BASE
    }/informasi-buronan/${service}`;

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
      .catch((err) => console.log(err));
    // .finally(() => console.log(data));
  }, [service]);

  const headers = data && data.length > 0 && Object.keys(data[0]);

  return (
    <Card sx={{ maxHeight: 300, bgcolor: "#33714E" }}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: "h7" }}
        sx={{ fontWeight: 700, color: "white" }}
      />
      <CardContent sx={{ p: 2, overflowX: "scroll", maxHeight: 300 }}>
        {!data ? (
          <Typography color="white">Data not found</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {headers &&
                  headers.map((header, idx) => (
                    <TableCell
                      key={idx}
                      sx={{
                        bgcolor: "#E4C64D",
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
              {data && data.length > 0 ? (
                data.map((item, idx) => (
                  <TableRow key={idx}>
                    {Object.values(item).map((value, idx) => (
                      <TableCell key={idx} sx={{ color: "white" }}>
                        {value.toString()}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Data not found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
