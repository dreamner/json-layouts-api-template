import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function ToggleButtons() {
  const handleChange = (e) => {};
  const page = "homepage";
  return (
    <Box sx={{ mb: 3, display: "flex" }}>
      <Box sx={{ width: 200 }}>
        <Button fullWidth sx={{ textTransform: "none" }} variant="outlined">
          Add page
        </Button>
      </Box>
      <Box sx={{ width: 180, ml: 2 }}>
        <FormControl size="small" fullWidth>
          <InputLabel id="demo-simple-select-label">Select page</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={page}
            label="Select page"
            onChange={handleChange}
          >
            <MenuItem value={"homepage"}>Homepage</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
