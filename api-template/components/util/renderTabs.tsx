import * as React from "react";
import MuiTabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import renderComponents from "./renderComponents";

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

export default function Tabs({ items = [] }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box key={"hjggx"} sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {items.map((item, index) => {
            return <Tab key={index} label={item.label} {...a11yProps(index)} />;
          })}
        </MuiTabs>
      </Box>

      {items.map((item, index) => {
        return (
          <TabPanel index={index} value={index} key={index}>
            {renderComponents(item.components)}
          </TabPanel>
        );
      })}
    </Box>
  );
}
