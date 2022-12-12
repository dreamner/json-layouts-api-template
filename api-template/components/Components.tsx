import { Box, Paper, TextField, Divider } from "@mui/material";
import { usePagesStateValue } from "../lib/builder";

export default function Components() {
  const pages = usePagesStateValue("pages")[0];
  console.log(pages);
  const components = pages?.components ?? [];
  return (
    <Box sx={{ p: 2, bgcolor: "lightblue" }}>
      {components.map((component: any) => {
        return (
          <Paper sx={{ p: 2 }}>
            <TextField
              fullWidth
              size="small"
              value={component.type}
              label="Type"
            />
            <Divider sx={{ my: 2 }} />
          </Paper>
        );
      })}
    </Box>
  );
}
