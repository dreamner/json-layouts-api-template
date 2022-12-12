import { Box, Paper, TextField, Divider } from "@mui/material";
import { usePagesStateValue } from "../lib/builder";

export default function ComponentsTab() {
  const pages = usePagesStateValue("pages")[0];
  const componentsData = pages?.components ?? [];
  return (
    <Box sx={{ p: 2, bgcolor: "lightblue" }}>
      {componentsData.map((component: any) => {
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
