import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import capitalizeStr from "../../utils/capitalizeStr";

export default function ProfileCard({ data }) {
  return (
    <Card sx={{ bgcolor: "#33714E" }}>
      <CardHeader
        title="Profil Buronan"
        titleTypographyProps={{ variant: "h7" }}
        sx={{ fontWeight: 700, color: "white" }}
      />
      {data && (
        <CardContent sx={{ pt: 0 }}>
          <Container
            sx={{
              display: "flex",
              my: 3,
              justifyContent: "center",
            }}
          >
            <img
              src={"/harun.jpg"}
              alt="thumbnail"
              style={{ objectFit: "contain", width: "100%" }}
            />
          </Container>
          <Table size="small">
            <TableBody>
              {Object.entries(data)
                .filter(
                  ([key, value]) =>
                    key !== "photoUrl" &&
                    (typeof value === "string" || typeof value === "number")
                )
                .map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>
                      <Typography color="white" fontWeight={500}>
                        {capitalizeStr(key)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>{value}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
}
