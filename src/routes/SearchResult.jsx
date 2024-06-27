import {
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CardGraphVis from "../components/elements/CardGraphVis";

export default function SearchResult() {
  const [singleData, setSingleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE}/oneBuron}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setSingleData(data);
      } else {
        alert("Fetching failed!");
      }
    };
    fetchData();
    console.log(singleData);
  }, []);

  return (
    <Box display="flex" p={2} gap={2} minHeight="100vh">
      <Card sx={{ width: "25%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Detail Buronan
          </Typography>
          <img
            src="/pp_crop.png"
            alt="placeholder"
            style={{ maxHeight: 180, marginBottom: 2 }}
          />
          {singleData ? (
            <TableContainer>
              <Table>
                <TableBody>
                  {Object.entries(singleData[0]).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>Fetching data failed</div>
          )}
        </CardContent>
      </Card>
      <Grid container gap={2}>
        <Grid item xs={4}>
          <CardGraphVis />
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: 100 }}>
            <CardContent>
              <Typography variant="h6">Last Seen</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: 100 }}>
            <CardContent>
              <Typography variant="h6">Last Seen</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: 100 }}>
            <CardContent>
              <Typography variant="h6">Detail Percakapan</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
