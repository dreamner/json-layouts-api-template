import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { usePagesStateValue } from "../lib/builder";
import AddPageDialog from "./AddPageDialog";

export default function ToggleButtons() {
  const handleChange = (e) => {};
  const page = "homepage";
  const pages = usePagesStateValue("pages");
  return (
    <Box sx={{ mb: 3, display: "flex" }}>
      <Box sx={{ width: 200 }}>
        <AddPageDialog />
      </Box>
      <Box sx={{ width: 180, ml: 2 }}>
        <FormControl size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">Select page</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={0}
            label="Select page"
            onChange={handleChange}
          >
            {pages.map((page, index) => {
              return <MenuItem key={index} value={index}>{page.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
