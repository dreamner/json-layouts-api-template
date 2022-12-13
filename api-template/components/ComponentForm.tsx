import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useState } from "react";
import { usePagesStateValue } from "../lib/builder";

export default function ComponentForm() {
  const [type, setType] = useState("box");
  const handleChange = (e) => setType(e.target.value);
  const { handleSubmit } = useActions();
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Select component type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Select component type"
          onChange={handleChange}
        >
          <MenuItem value={"box"}>Box</MenuItem>
          <MenuItem value={"text"}>Text</MenuItem>
          <MenuItem value={"button"}>Button</MenuItem>
        </Select>
      </FormControl>
      <Button
        fullWidth
        sx={{ mt: 3 }}
        onClick={(e) => handleSubmit(type)}
        variant="contained"
      >
        Add
      </Button>
    </Box>
  );
}

const components = {
  button: {
    type: "button",
    data: {
      text: "Add pages to this app",
      href: "href",
      target: "blank",
      sx: "mt:4",
    },
  },
  text: {
    type: "text",
    data: {
      text: "Hello world",
    },
  },
  box: {
    type: "box",
    data: {
      textAlign: "center",
      components: [
        {
          type: "text",
          data: {
            text: "Hello World",
            variant: "h1",
          },
        },
      ],
    },
  },
};

function useActions() {
  const pages = usePagesStateValue("pages");
  const dispatch = usePagesStateValue("dispatch");
  const pageIndex = usePagesStateValue("pageIndex");

  return {
    handleSubmit(type: string) {
      let allPages = [...pages];
      let page = allPages[pageIndex];
      page.components = [...(page.components ?? []), components[type]];
      allPages[pageIndex] = page;
      const payload = allPages;
      const key = "pages";
      dispatch({
        type: "update_all",
        payload,
        pages,
      });
    },
  };
}
