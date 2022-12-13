import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import Select from "./util/components/Select";
import { usePagesStateValue } from "../lib/builder";

export default function CompontentsAccordion({ component, index }) {
  const [componentData, setComponentData] = React.useState(() => component);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComponentData((p) => ({ ...p, [name]: value }));
  };

  const { handleChange: update, handleDelete: deleteComponent } = useActions();

  const handleUpdate = () => update(componentData, index);
  const handleDelete = () => deleteComponent(index);

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
              name="type"
              onChange={handleChange}
            >
              <MenuItem value={"box"}>Box</MenuItem>
              <MenuItem value={"text"}>Text</MenuItem>
              <MenuItem value={"button"}>Button</MenuItem>
            </Select>
          </FormControl>
          <AccordionActions>
            <Button
              variant="outlined"
              disabled={component.type === componentData.type}
              sx={{ mt: 3 }}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ mt: 3 }}
              onClick={handleDelete}
            >
              Delete{" "}
            </Button>
          </AccordionActions>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

function useActions() {
  const dispatch = usePagesStateValue("dispatch");
  const pages = usePagesStateValue("pages");
  const pageIndex = usePagesStateValue("pageIndex");
  return {
    handleChange(component, index) {
      try {
        let allPages = [...pages];
        let page = allPages[pageIndex];
        page.components[index] = component;
        allPages[pageIndex] = page;
        const type = "update_all";
        const payload = allPages;
        const key = "pages";
        dispatch({ type, key, payload });
      } catch (e) {}
    },
    handleDelete(index) {
      try {
        let allPages = [...pages];
        let page = allPages[pageIndex];
        page.components.splice(index, 1);
        allPages[pageIndex] = page;
        const type = "update_all";
        const payload = allPages;
        const key = "pages";
        dispatch({ type, key, payload });
      } catch (e) {}
    },
  };
}
