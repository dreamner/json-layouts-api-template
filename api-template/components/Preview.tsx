import { Paper, ThemeProvider } from "@mui/material";
import usePages from "../hooks/usePages";
import { usePagesStateValue } from "../lib/builder";
import defaultTheme from "../lib/defaultheme";
import renderPage from "./util/renderPage";

export default function Preview({ fullScreen = false }) {
  usePages();
  const pageIndex = usePagesStateValue("pageIndex");
  const pageData = usePagesStateValue("pages")[pageIndex];
  if (!pageData)
    return (
      <Paper
        sx={{
          p: 2,
          maxHeight: `${fullScreen ? "100%" : "76vh"}`,
          minHeight: `${fullScreen ? "100%" : "76vh"}`,
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No page data found
      </Paper>
    );
  if (fullScreen) {
    return (
      <ThemeProvider theme={defaultTheme}>{renderPage(pageData)}</ThemeProvider>
    );
  }
  return (
    <Paper
      sx={{
        p: fullScreen ? 0 : 2,
        maxHeight: `${fullScreen ? "100%" : "76vh"}`,
        minHeight: `${fullScreen ? "100%" : "60vh"}`,
        overflow: "auto",
      }}
    >
      {renderPage(pageData)}
    </Paper>
  );
}
