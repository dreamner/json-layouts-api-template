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
  FormGroup,
  FormControlLabel,
  Switch,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { usePagesStateValue } from "../lib/builder";

interface IC {
  data?: any;
  index?: number;
  handleTypeChange?: any
  type: string
  handleComponentTypeChange: any
  handleComponentDataTypeChange: any
  deleteChildComponent: any
  handleCheck: any
  handleChange: any
}

export default function ComponentForm({ data: state, index: cIindex, handleTypeChange, type, handleComponentTypeChange, handleComponentDataTypeChange
  , deleteChildComponent, handleChange, handleCheck }: IC) {
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
          onChange={handleTypeChange}
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
        {Object.keys(state?.data ?? {})?.map((key, idx) => {
          if (typeof state?.data[key] === "object") {
            const obj = state?.data[key];
            return (
              <Box key={idx}>
                {key === "components" && (
                  <Typography variant="caption">{key}</Typography>
                )}
                <Stack spacing={2} sx={{ p: 2 }}>
                  {(obj ?? []).map((scComponent, index) => {
                    return (
                      <>
                        <Paper sx={{ width: "100%", p: 1 }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Select component type
                            </InputLabel>
                            <Select
                              fullWidth
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={scComponent.type}
                              label="Select component type"
                              onChange={(e) =>
                                handleComponentTypeChange(e, idx)
                              }
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
                            {Object.keys(scComponent.data ?? []).map(
                              (schild, sindex) => {
                                if (schild === "components") {
                                  return (
                                    <>
                                      <p>{schild}</p>
                                    </>
                                  )
                                }
                                return (
                                  <>
                                    <TextField
                                      name={schild}
                                      onChange={(e) =>
                                        handleComponentDataTypeChange(e, idx)
                                      }
                                      value={scComponent.data[schild]}
                                      key={sindex}
                                      label={schild}
                                    />
                                  </>
                                );
                              }
                            )}
                          </Stack>
                          <button onClick={() => deleteChildComponent(idx)}>
                            Delete component
                          </button>
                        </Paper>
                      </>
                    );
                  })}
                </Stack>
              </Box>
            );
          }
          if (typeof state?.data[key] === "boolean") {
            return (
              <>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        name={key}
                        onChange={handleCheck}
                        value={state?.data[key]}
                        defaultChecked={state?.data[key]}
                      />
                    }
                    label={key}
                  />
                </FormGroup>
              </>
            );
          }
          return (
            <TextField
              name={key}
              onChange={handleChange}
              value={state?.data[key]}
              key={idx}
              label={key}
            />
          );
        })}
      </Stack>
    </Box>
  );
}

export function useActions() {
  const pages = usePagesStateValue("pages");
  const dispatch = usePagesStateValue("dispatch");
  const pageIndex = usePagesStateValue("pageIndex");

  return {
    handleSubmit(state, index) {
      if (index === 0 || index) {
        alert(index);
        let allPages = [...pages];
        let page = allPages[pageIndex];
        page.components[index] = { ...state };
        allPages[pageIndex] = page;
        const payload = allPages;
        const key = "pages";
        dispatch({
          type: "update_all",
          payload,
          key,
        });
        return;
      }
      let allPages = [...pages];
      let page = allPages[pageIndex];
      page.components = [...(page.components ?? []), { ...state }];
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
