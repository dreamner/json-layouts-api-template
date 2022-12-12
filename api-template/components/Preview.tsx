import { Paper } from "@mui/material";

export default function Preview() {
  const page = { name: null };
  if (!page?.name)
    return (
      <Paper
        sx={{
          p: 2,
          maxHeight: "60vh",
          minHeight: "60vh",
          overflow: "scroll",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No page data found
      </Paper>
    );
  return (
    <Paper
      sx={{ p: 2, maxHeight: "60vh", minHeight: "60vh", overflow: "scroll" }}
    ></Paper>
  );
}
