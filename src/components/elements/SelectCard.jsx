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
import capitalizeStr from "../../utils/capitalizeStr";

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
          color: headerCol ? headerCol : '#028f41',
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
              maxHeight: 186,
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
              {Object.entries(data)
                .filter(([key, value]) => key !== "photoUrl")
                .map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>
                      <Typography
                        fontWeight={500}
                        color={txtCol ? txtCol : "#282d33"}
                      >
                        {capitalizeStr(key)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: txtCol ? txtCol : "#282d33" }}>
                      {typeof value === "object" ? typeof value : value}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
