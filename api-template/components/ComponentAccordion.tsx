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
  Select,
  TextField,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import { usePagesStateValue } from "../lib/builder";
import { components } from "./ComponentForm";

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
      <Accordion elevation={0} sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{component.type}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ my: 2 }}>Configure this component</Typography>
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
              <MenuItem value={"text"}>Text</MenuItem>
              <MenuItem value={"box"}>Box</MenuItem>
              <MenuItem value={"image"}>Image</MenuItem>
              <MenuItem value={"button"}>Button</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ my: 2 }}>
            <Typography variant="caption">
              {" "}
              {component?.type} Metadata
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={2}>
              {Object.keys(component?.data ?? {})?.map((key, idx) => {
                if (typeof component?.data[key] === "object") {
                  const obj = component?.data[key];
                  if (key === "components") {
                    return (
                        <Box key={idx} >
                          <Typography variant="caption">{key}</Typography>
                          {(obj ?? []).map((child, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  backgroundClip: "lightgray",
                                  padding: "6px",
                                }}
                              >
                                <TextField
                                  label={"Type"}
                                  key={index}
                                  fullWidth
                                  value={child.type}
                                />
                                <Divider sx={{ my: 1 }} />
                                {child?.data?.components?.map((component, index) => {
                                  return <div key={index} >{component.type}</div>;
                                })}
                              </div>
                            );
                          })}
                        </Box>
                    );
                  }
                  return (
                    <Box key={idx} >
                      <Typography variant="caption">{key}</Typography>
                      {Object.keys(obj ?? {}).map(
                        (childcomponentKey, index) => {
                          return (
                            <TextField
                              label={childcomponentKey}
                              key={index}
                              value={obj[childcomponentKey]}
                            />
                          );
                        }
                      )}
                    </Box>
                  );
                }
                return (
                  <TextField
                    value={component?.data[key]}
                    key={idx}
                    label={key}
                  />
                );
              })}
            </Stack>
          </Box>
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
        const componentType = component.type;
        page.components[index] = { ...components[componentType], ...component };
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
