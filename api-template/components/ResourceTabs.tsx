import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UploadImageDialog from "./UploadImageDialog";
import { Button, Divider, Grid, Paper, Stack } from "@mui/material";
import DatatableFormDialog from "./DatatableFormDialog";
import router from "next/router";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ResourceTabs({ resourceGroup }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!Boolean(resourceGroup)) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ textTransform: "none" }} label="Media" {...a11yProps(0)} />
          <Tab
            sx={{ textTransform: "none" }}
            label="Data Tables"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box>
            <UploadImageDialog resourceGroup={{ ...resourceGroup }} />
          </Box>
        </Box>
        <Box>
          <Typography variant="h3">Media</Typography>
          {!Boolean(resourceGroup?.images?.length) && (
            <Typography sx={{ mt: 2 }}>No media added </Typography>
          )}

          <Grid container sx={{ mt: 3 }} spacing={3}>
            {resourceGroup?.images?.map((image) => {
              return (
                <Grid item xs={4} key={image.url}>
                  <Paper elevation={0} sx={{ p: 3 }}>
                    <img
                      style={{ maxHeight: 180 }}
                      width={"100%"}
                      src={image.url}
                      alt=""
                    />
                    <Button variant="outlined">Copy link</Button>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}></Box>
          <Box>
            <DatatableFormDialog resourceGroup={{ ...resourceGroup }} />
          </Box>
        </Box>
        <Typography variant="h3">Tables</Typography>
        {!Boolean(resourceGroup?.tables?.length) && (
          <Typography sx={{ mt: 2 }}>No tables added </Typography>
        )}
        <Grid container sx={{ mt: 3 }} spacing={3}>
          {resourceGroup?.tables?.map((table) => {
            const columns = table.columns;
            return (
              <Grid item xs={5} key={table?.id}>
                <Paper elevation={0} sx={{ p: 3 }}>
                  <Stack spacing={2}>
                    <Typography>{table.name}</Typography>
                    <Divider />
                    <Typography>Fields</Typography>
                    <ul>
                      {columns.map((column, index) => {
                        return <li key={index}>{column.key}</li>;
                      })}
                    </ul>
                    <Stack spacing={2} direction={"row"}>
                      <Box>
                        <Button
                          size="small"
                          sx={{ textTransform: "none" }}
                          disabled
                          variant="outlined"
                        >
                          Copy link
                        </Button>
                      </Box>
                      <Button
                        size="small"
                        onClick={() =>
                          router.push(`/res/table/${table.id}/create`)
                        }
                        sx={{ textTransform: "none" }}
                        variant="outlined"
                      >
                        Add record
                      </Button>
                      <Button
                        size="small"
                        onClick={() => router.push(`/res/table/${table.id}`)}
                        sx={{ textTransform: "none" }}
                        variant="outlined"
                      >
                        View records
                      </Button>
                      <Button
                        size="small"
                        sx={{ textTransform: "none" }}
                        disabled
                        variant="outlined"
                      >
                        Create form
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </TabPanel>
    </Box>
  );
}
