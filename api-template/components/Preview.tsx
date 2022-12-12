import { Paper } from "@mui/material";
import { usePagesStateValue } from "../lib/builder";
import renderPage from "./util/renderPage";

export default function Preview() {
  const pageData = usePagesStateValue("pages")[0];
  if (!pageData)
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
    >
      {renderPage(pageData)}
    </Paper>
  );
}
