import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import capitalizeStr from "../../utils/capitalizeStr";

export default function CardTableTrack({
  data,
  title,
  label,
  source,
  onSelectChg,
  srcList,
}) {
  // console.log(data);
  const headers = data && Object.keys(data[0]);
  return (
    <Card sx={{ bgcolor: "whitesmoke" }}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: "h7" }}
        sx={{ fontWeight: 700, color: "#028f41" }}
      />
      <CardContent sx={{ p: 2, overflowX: "scroll", maxHeight: 360 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={source}
            label="Age"
            onChange={onSelectChg}
            sx={{ bgcolor: "white" }}
          >
            {srcList.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Table>
          <TableHead>
            <TableRow>
              {headers &&
                headers.map((header, idx) => (
                  <TableCell
                    key={idx}
                    sx={{
                      fontWeight: 600,
                      color: "#282d33",
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
                    <TableCell key={idx} sx={{ color: "#282d33" }}>
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
