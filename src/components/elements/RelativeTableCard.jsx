import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import capitalizeStr from "../../utils/capitalizeStr";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function RelativeTableCard({ service, title, setValue }) {
  const [data, setData] = useState(null);

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
      .catch((err) => console.log(err));
    // .finally(() => console.log(data));
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
            {data &&
              data.map((item, idx) => (
                <TableRow key={idx}>
                  {Object.entries(item).map(([key, value]) => (
                    <TableCell key={key} sx={{ color: "white" }}>
                      {key === "Nama" ? (
                        <Button
                          variant="contained"
                          onClick={() => setValue(value)}
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: 600,
                            color: "#353229",
                            bgcolor: "#E4C64D",
                            "&:hover": { bgcolor: "#F6EFC5" },
                          }}
                        >
                          {value}
                        </Button>
                      ) : (
                        value
                      )}
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
