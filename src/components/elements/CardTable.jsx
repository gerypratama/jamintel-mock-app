import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  colors,
} from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function CardTable({
  service,
  bgCol = undefined,
  txtCol = undefined,
}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_BASE + service;
    const fetchData = async () => {
      await fetch(url, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
        .then((res) => res.json())
        .then((obj) => obj && setData(obj))
        .catch((err) => alert(err));
    };
    fetchData();
  }, []);

  return (
    <Card sx={{ bgcolor: bgCol ? bgCol : "whitesmoke" }}>
      <CardHeader
        title="Keluarga"
        titleTypographyProps={{ variant: "h7" }}
        sx={{ fontWeight: 700, color: colors.blue.A400 }}
      />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: txtCol ? txtCol : "#282d33" }}>
                Nama
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: txtCol ? txtCol : "#282d33" }}>
                Hubungan
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item) => (
                <TableRow key={item.nama}>
                  <TableCell sx={{ color: txtCol ? txtCol : "#282d33" }}>
                    {item.Nama}
                  </TableCell>
                  <TableCell sx={{ color: txtCol ? txtCol : "#282d33" }}>
                    {item.Hubungan}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
