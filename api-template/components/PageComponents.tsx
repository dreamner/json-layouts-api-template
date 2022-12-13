import { Box, Paper, TextField, Divider } from "@mui/material";
import { usePagesStateValue } from "../lib/builder";
import CompontentsAccordion from "./ComponentAccordion";

export default function ComponentsTab() {
  const pages = usePagesStateValue("pages")[0];
  const componentsData = pages?.components ?? [];
  return (
    <Box sx={{ p: 2, bgcolor: "lightblue", maxHeight: "69vh" }}>
      {componentsData.map((component: any, index: number) => {
        return (
          <CompontentsAccordion
            key={index}
            index={index}
            component={component}
          />
        );
      })}
    </Box>
  );
}
