import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { usePagesStateValue } from "../lib/builder";

export default function ComponentForm() {
  const [type, setType] = useState("box");
  const handleChange = (e) => setType(e.target.value);
  const { handleSubmit } = useActions();
  const component = components[type];
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
          <MenuItem value={"text"}>Text</MenuItem>
          <MenuItem value={"box"}>Box</MenuItem>
          <MenuItem value={"image"}>Image</MenuItem>
          <MenuItem value={"button"}>Button</MenuItem>
        </Select>
      </FormControl>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={2}>
        {Object.keys(component?.data ?? {})?.map((key, idx) => {
          if (typeof component?.data[key] === "object") {
            const obj = component?.data[key];
            return (
              <Box key={idx}>
                <Typography variant="caption">{key}</Typography>
                {Object.keys(obj ?? {}).map((childcomponentKey, index) => {
                  return (
                    <TextField
                      label={childcomponentKey}
                      key={index}
                      value={obj[childcomponentKey]}
                    />
                  );
                })}
              </Box>
            );
          }
          return (
            <TextField value={component?.data[key]} key={idx} label={key} />
          );
        })}
      </Stack>
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

export const components = {
  image: {
    type: "image",
    data: {
      imageUrl:
        "http://res.cloudinary.com/dreamercodes/image/upload/v1670928699/Screenshot_2021-09-05-21-17-28-950_host.exp.exponent_i7hxjl.jpg",
    },
  },
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
      flex: true,
      centerHorizontal: true,
      centerVertical: true,
      minHeight: "100vh",
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
      page.components = [...(page.components ?? []), { ...components[type] }];
      allPages[pageIndex] = page;
      const payload = allPages;
      const key = "pages";
      dispatch({
        type: "update_all",
        payload,
        key,
      });
    },
  };
}
