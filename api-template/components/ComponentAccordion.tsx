import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";
import Select from "./util/components/Select";
import { usePagesStateValue } from "../lib/builder";

export default function CompontentsAccordion({ component, index }) {
  const pages = usePagesStateValue("pages");
  const [componentData, setComponentData] = React.useState(() => component);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComponentData((p) => ({ ...p, [name]: value }));
  };

  return (
    <div>
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{component.type}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ mt: 2 }}>Configure this component</Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={componentData?.type}
              label="Type"
              onChange={handleChange}
            >
              <MenuItem value={"box"}>Box</MenuItem>
              <MenuItem value={"text"}>Text</MenuItem>
              <MenuItem value={"button"}>Button</MenuItem>
            </Select>
          </FormControl>
          <Button sx={{ mt: 3 }}>Update</Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
