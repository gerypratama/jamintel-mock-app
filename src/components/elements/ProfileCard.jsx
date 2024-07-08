import {
  capitalize,
  Card,
  CardContent,
  CardHeader,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

export default function ProfileCard({ data }) {
  return (
    <Card sx={{ bgcolor: "#33714E" }}>
      <CardHeader
        title="Profil Buronan"
        titleTypographyProps={{ variant: "h7" }}
        sx={{ fontWeight: 700, color: "white" }}
      />
      {data && (
        <CardContent>
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
                        {capitalize(key)}
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
