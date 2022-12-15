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
          {Object.keys(components).map((key) => (
            <MenuItem key={key} value={key}>
              {key}
            </MenuItem>
          ))}
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

export var components = {
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
  form: {
    type: "form",
    data: {
      components: [
        { type: "textfield", data: { label: "TextField" } },
        {
          type: "button",
          data: { text: "submit", disabled: false, type: "submit" },
        },
      ],
    },
  },
  text: {
    type: "text",
    data: {
      text: "Hello world",
      variant: "body1",
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
  autocomplete: {
    type: "autocomplete",
    data: {},
  },
  buttongroup: {
    type: "buttongroup",
    data: {},
  },
  checkbox: {
    type: "checkbox",
    data: {},
  },
  fab: {
    type: "fab",
    data: {},
  },
  radiogroup: {
    type: "radiogroup",
    data: {},
  },
  rating: {
    type: "rating",
    data: {},
  },
  select: {
    type: "select",
    data: {},
  },
  slider: {
    type: "slider",
    data: {},
  },
  switch: {
    type: "switch",
    data: {},
  },
  textfield: {
    type: "textfield",
    data: {
      label: "Textfield",
    },
  },
  transferlist: {
    type: "transferlist",
    data: {},
  },
  togglebutton: {
    type: "togglebutton",
    data: {},
  },
  avatar: {
    type: "avatar",
    data: {
      imageUrl: "",
    },
  },
  badge: {
    type: "badge",
    data: {},
  },
  chip: {
    type: "chip",
    data: {},
  },
  divider: {
    type: "divider",
    data: {},
  },
  list: {
    type: "list",
    data: {},
  },
  table: {
    type: "table",
    data: {},
  },
  tooltip: {
    type: "tooltip",
    data: {},
  },
  alert: {
    type: "alert",
    data: {},
  },
  backdrop: {
    type: "backdrop",
    data: {},
  },
  dialog: {
    type: "dialog",
    data: {},
  },
  progress: {
    type: "progress",
    data: {},
  },
  skeleton: {
    type: "skeleton",
    data: {},
  },
  snackbar: {
    type: "snackbar",
    data: {},
  },
  accordion: {
    type: "accorion",
    data: {},
  },
  appbar: {
    type: "appbar",
    data: {},
  },
  card: {
    type: "card",
    data: {},
  },
  bottom_navigation: {
    type: "bottom_navigation",
    data: {},
  },
  breadcrumbs: {
    type: "breadcrumbs",
    data: {},
  },
  drawer: {
    type: "drawer",
    data: {},
  },
  link: {
    type: "link",
    data: {},
  },
  paypal: {
    type: "paypal",
    data: {},
  },
  menu: {
    type: "menu",
    data: {},
  },
  pagination: {
    type: "pagination",
    data: {},
  },
  speeddial: {
    type: "speeddial",
    data: {},
  },

  stepper: {
    type: "stepper",
    data: {},
  },
  tabs: {
    type: "tabs",
    data: {},
  },
  container: {
    type: "container",
    data: {},
  },
  grid: {
    type: "grid",
    data: {},
  },
  stack: {
    type: "stack",
    data: {},
  },
  imagelist: {
    type: "imageslist",
    data: {},
  },
};
