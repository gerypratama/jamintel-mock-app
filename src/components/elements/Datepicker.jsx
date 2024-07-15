import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Datepicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Pilih tanggal"
        slotProps={{ textField: { size: "small" } }}
        sx={{ width: "50%", marginLeft: "10px" }}
      />
    </LocalizationProvider>
  );
}
