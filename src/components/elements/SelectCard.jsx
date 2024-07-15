import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import capitalizeStr from "../../utils/capitalizeStr";
import StyledCard from "./StyledCard";

export default function SelectCard({
  title,
  label,
  value,
  onSelectChg,
  itemList,
  imgUrl = undefined,
  data,
}) {
  // console.log(data)

  const items = Array.isArray(itemList) ? itemList : Array(itemList);

  return (
    <StyledCard title={title}>
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
          {items.map((item, idx) => (
            <MenuItem key={idx} value={item}>
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
        <Table size="small">
          <TableBody>
            {Object.entries(data)
              .filter(([key, value]) => key !== "photoUrl")
              .map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell>
                    <Typography fontWeight={500} color="white">
                      {capitalizeStr(key)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {typeof value === "object" ? typeof value : value}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </StyledCard>
  );
}
