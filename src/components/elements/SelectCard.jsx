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
  colors,
} from "@mui/material";

export default function SelectCard({
  title,
  label,
  value,
  onSelectChg,
  itemList,
  imgUrl = undefined,
  data,
  bgCol = undefined,
  headerCol = undefined,
  txtCol = undefined,
}) {
  // console.log(data)
  return (
    <Card sx={{ bgcolor: bgCol ? bgCol : "#f5f5f5" }}>
      <CardHeader
        titleTypographyProps={{ variant: "h7" }}
        title={title}
        sx={{
          fontWeight: 700,
          color: headerCol ? headerCol : colors.blue.A400,
        }}
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
            sx={{ bgcolor: "white" }}
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
              maxHeight: 186
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
                  <Typography
                    fontWeight={500}
                    color={txtCol ? txtCol : "#282d33"}
                  >
                    Nama Lengkap
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: txtCol ? txtCol : "#282d33" }}>
                  {data.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    fontWeight={500}
                    color={txtCol ? txtCol : "#282d33"}
                  >
                    Tempat Kelahiran
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: txtCol ? txtCol : "#282d33" }}>
                  {data.birth_place}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    fontWeight={500}
                    color={txtCol ? txtCol : "#282d33"}
                  >
                    Tanggal Kelahiran
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: txtCol ? txtCol : "#282d33" }}>
                  {data.birth_date}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
