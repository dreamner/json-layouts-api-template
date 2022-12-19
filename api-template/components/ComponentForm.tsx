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
  Autocomplete,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { usePagesStateValue } from "../lib/builder";
import BrowseComponents from "./BrowseComponents.Dialog";

interface IC {
  data?: any;
  index?: number;
  handleTypeChange?: any;
  type: string;
  handleComponentTypeChange: any;
  handleComponentDataTypeChange: any;
  deleteChildComponent: any;
  handleCheck: any;
  handleChange: any;
  handleAddChildComponent?: any;
  handleChangeOption: any;
  handleAddOption: any;
  handleDeleteOption: any;
}

export const ComponentSelect = ({ value, onChange }) => {
  const componentData = Object.keys(components ?? {}).map((key) => ({
    label: key,
    value: key,
  }));

  return (
    <>
      <BrowseComponents select={onChange} />
      <Autocomplete
        sx={{ mb: 3 }}
        size="small"
        disablePortal
        value={value}
        onChange={(e, o) => onChange(o ?? { value: "text" })}
        id="combo-box-demo"
        options={componentData}
        renderInput={(params) => (
          <TextField {...params} label="Search component" />
        )}
      />
    </>
  );
};

export default function ComponentForm({
  data: state,
  handleComponentTypeChange,
  handleComponentDataTypeChange,
  deleteChildComponent,
  handleChange,
  handleCheck,
  handleAddChildComponent,
  handleChangeOption,
  handleAddOption,
  handleDeleteOption,
}: IC) {
  const componentData = Object.keys(components ?? {}).map((key) => ({
    label: key,
    value: key,
  }));
  return (
    <Box>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={2}>
        {Object.keys(state?.data ?? {})?.map((key, idx) => {
          if (typeof state?.data[key] === "object") {
            const obj = state?.data[key];
            return (
              <Box key={idx}>
                {key === "components" && (
                  <>
                    <Stack spacing={2} sx={{ p: 2 }}>
                      {!(obj ?? [])?.length && (
                        <>
                          <Typography variant="caption">{key}</Typography>

                          <Box>
                            <Button
                              fullWidth
                              onClick={() => handleAddChildComponent(0)}
                              sx={{ textTransform: "none" }}
                              variant="outlined"
                            >
                              Add component
                            </Button>
                          </Box>
                        </>
                      )}
                      {(obj ?? []).map((scComponent, componentIndex) => {
                        return (
                          <>
                            <Paper sx={{ width: "100%", p: 1 }}>
                              <Autocomplete
                                sx={{ mb: 3 }}
                                size="small"
                                disablePortal
                                value={scComponent.type}
                                onChange={(e, o) =>
                                  handleComponentTypeChange(
                                    o ?? { value: "text" },
                                    componentIndex
                                  )
                                }
                                id="combo-box-demo"
                                options={componentData}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Change component"
                                  />
                                )}
                              />

                              <Divider sx={{ my: 2 }} />
                              <Stack spacing={2}>
                                {Object.keys(scComponent.data ?? []).map(
                                  (schild, sindex) => {
                                    if (
                                      typeof scComponent?.data[schild] ===
                                      "boolean"
                                    ) {
                                      return (
                                        <>
                                          <FormGroup>
                                            <FormControlLabel
                                              control={
                                                <Switch
                                                  size="small"
                                                  name={schild}
                                                  onChange={(e) =>
                                                    handleComponentDataTypeChange(
                                                      e,
                                                      componentIndex
                                                    )
                                                  }
                                                  value={
                                                    scComponent?.data[schild]
                                                  }
                                                  defaultChecked={
                                                    scComponent?.data[schild]
                                                  }
                                                />
                                              }
                                              label={schild}
                                            />
                                          </FormGroup>
                                        </>
                                      );
                                    }

                                    if (schild === "components") {
                                      return null;
                                    }

                                    if (schild === "options") {
                                      return (
                                        <>
                                          <Typography variant="caption">
                                            {schild}
                                          </Typography>
                                          {(scComponent.data.options ?? []).map(
                                            (option, optImdex) => {
                                              return (
                                                <Box
                                                  sx={{ my: 2 }}
                                                  key={optImdex}
                                                >
                                                  <Typography sx={{ mb: 1 }}>
                                                    {optImdex + 1}
                                                  </Typography>
                                                  <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                      <TextField
                                                        size="small"
                                                        fullWidth
                                                        label={"Label"}
                                                        name="label"
                                                        value={option.label}
                                                        // onChange={(e) =>
                                                        //   handleChangeOption(
                                                        //     e,
                                                        //     optImdex
                                                        //   )
                                                        // }
                                                      />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                      <TextField
                                                        size="small"
                                                        fullWidth
                                                        name="value"
                                                        label={"Value"}
                                                        value={option.value}
                                                        // onChange={(e) =>
                                                        //   handleChangeOption(
                                                        //     e,
                                                        //     optImdex
                                                        //   )
                                                        // }
                                                      />
                                                    </Grid>
                                                  </Grid>
                                                  <Box>
                                                    <Button
                                                      fullWidth
                                                      onClick={() =>
                                                        handleDeleteOption(
                                                          optImdex
                                                        )
                                                      }
                                                      sx={{
                                                        textTransform: "none",
                                                        mt: 2,
                                                      }}
                                                      variant="outlined"
                                                      size="small"
                                                      color="error"
                                                    >
                                                      Delete option
                                                    </Button>
                                                  </Box>
                                                </Box>
                                              );
                                            }
                                          )}
                                        </>
                                      );
                                    }

                                    return (
                                      <>
                                        <TextField
                                          size="small"
                                          name={schild}
                                          onChange={(e) =>
                                            handleComponentDataTypeChange(
                                              e,
                                              componentIndex
                                            )
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

                              <Button
                                size="small"
                                sx={{ mt: 2, textTransform: "none" }}
                                color="primary"
                                disableElevation
                                fullWidth
                                variant="contained"
                                onClick={() =>
                                  handleAddChildComponent(
                                    componentIndex - 1 < 0
                                      ? 0
                                      : componentIndex - 1
                                  )
                                }
                              >
                                Add Above
                              </Button>
                              <Button
                                disableElevation
                                size="small"
                                sx={{ mt: 2, textTransform: "none" }}
                                color="error"
                                fullWidth
                                variant="contained"
                                onClick={() =>
                                  handleAddChildComponent(componentIndex + 1)
                                }
                              >
                                Add Below
                              </Button>
                              <Button
                                size="small"
                                sx={{ mt: 2, textTransform: "none" }}
                                color="error"
                                fullWidth
                                variant="outlined"
                                onClick={() =>
                                  deleteChildComponent(componentIndex)
                                }
                              >
                                Delete component
                              </Button>
                            </Paper>
                          </>
                        );
                      })}
                    </Stack>
                  </>
                )}

                {key === "options" && (
                  <>
                    <Box>
                      <Typography variant="caption">{key}</Typography>
                      {(obj ?? []).map((option, optImdex) => {
                        return (
                          <Box sx={{ my: 2 }} key={optImdex}>
                            <Typography sx={{ mb: 1 }}>
                              {optImdex + 1}
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <TextField
                                  size="small"
                                  fullWidth
                                  label={"Label"}
                                  name="label"
                                  value={option.label}
                                  onChange={(e) =>
                                    handleChangeOption(e, optImdex)
                                  }
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  size="small"
                                  fullWidth
                                  name="value"
                                  label={"Value"}
                                  value={option.value}
                                  onChange={(e) =>
                                    handleChangeOption(e, optImdex)
                                  }
                                />
                              </Grid>
                            </Grid>
                            <Box>
                              <Button
                                fullWidth
                                onClick={() => handleDeleteOption(optImdex)}
                                sx={{ textTransform: "none", mt: 2 }}
                                variant="outlined"
                                size="small"
                                color="error"
                              >
                                Delete option
                              </Button>
                            </Box>
                          </Box>
                        );
                      })}

                      <Box>
                        <Button
                          fullWidth
                          onClick={() => handleAddOption(0)}
                          sx={{ textTransform: "none" }}
                          variant="outlined"
                        >
                          Add Option
                        </Button>
                      </Box>
                    </Box>
                  </>
                )}
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
                        size="small"
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
              size="small"
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

var option = [{ label: "Label", value: "value" }];

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
    data: {
      options: [{ ...option }],
    },
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
    data: {
      options: [{ ...option }],
    },
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
