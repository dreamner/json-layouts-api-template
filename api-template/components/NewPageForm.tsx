import defaultPage from "../lib/defaultApp";
import { Box, Grid, Paper, Typography } from "@mui/material";
import renderPage from "./util/renderPage";
export default function NewPageForm() {
  const templates = [defaultPage];
  return (
    <Box>
      <Box>
        <Typography variant="h5">Pick a template to start from</Typography>
        <Grid container spacing={2}>
          {templates.map((template, index) => {
            return (
              <Grid item key={index} xs={4}>
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: "100%",
                    border: "1px solid gray",
                    cursor: "poiner",
                  }}
                >
                  {renderPage(template)}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
