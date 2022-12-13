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
  const pages = usePagesStateValue("pages");
  const pageIndex = usePagesStateValue("pageIndex");
  const { changePage } = useActions();
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
            value={pageIndex}
            label="Select page"
            onChange={(e) => changePage(e.target.value)}
          >
            {pages.map((page, index) => {
              return (
                <MenuItem key={index} value={index}>
                  {index + 1} {page.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

function useActions() {
  const dispatch = usePagesStateValue("dispatch");

  return {
    changePage(index: number) {
      const type = "update_all";
      const payload = index;
      const key = "pageIndex";
      dispatch({ type, key, payload });
    },
  };
}
