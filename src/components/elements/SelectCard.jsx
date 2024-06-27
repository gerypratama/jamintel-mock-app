import {
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

export default function SelectCard({
  title,
  label,
  value,
  onSelectChg,
  itemList,
  imgUrl = undefined,
  data = undefined,
}) {
  return (
    <Card>
      <CardHeader
        titleTypographyProps={{ variant: "h7" }}
        title={title}
        sx={{ fontWeight: 700, color: "#282d33" }}
      />
      <CardContent>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Age"
            onChange={onSelectChg}
          >
            {itemList.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {imgUrl && (
          <Container
            sx={{
              display: "flex",
              my: 3,
              justifyContent: "center",
            }}
          >
            <img
              src={imgUrl}
              alt="thumbnail"
              style={{ objectFit: "contain", width: "100%" }}
            />
          </Container>
        )}
        {data && (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={500}>Nama Lengkap</Typography>
                </TableCell>
                <TableCell>{data.nama}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={500}>TTL</Typography>
                </TableCell>
                <TableCell>{data.ttl}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
