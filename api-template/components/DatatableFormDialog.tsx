import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DatatableFormDialog({ resourceGroup }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [fields, setFields] = React.useState([{ name: "" }]);

  const handleAddField = () => {
    setFields((p) => [...p, { name: "" }]);
  };

  const handleRemoveField = (index) => {
    setFields((p) => {
      let all = [...p];
      all.splice(index, 1);
      return all;
    });
  };

  const handleFieldChange = (e, index) => {
    const { value, name } = e.target;
    setFields((p) => {
      let all = [...p];
      all[index] = { ...p[index], [name]: value };
      return all;
    });
  };

  const [state, setState] = React.useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Button
        size="small"
        fullWidth
        variant="outlined"
        sx={{ textTransform: "none" }}
        onClick={handleClickOpen}
      >
        Create a new table
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar elevation={0} sx={{ position: "fixed" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Data Table
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <Toolbar />
          <Container sx={{mb:6}} >
            <form>
              <Stack spacing={3}>
                <div></div>
                <TextField
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  value={state.name}
                />
                <TextField
                  multiline
                  name="description"
                  rows={5}
                  label="Description"
                  onChange={handleChange}
                  value={state.description}
                />
                <Typography variant="h5">Fields</Typography>
                <Box>
                  <Container   >
                    <Stack spacing={2}>
                      {fields.map((field, index) => {
                        return (
                          <Paper sx={{ p: 2 }} key={index}>
                            <Box sx={{ display: "flex", my: 2 }}>
                              <Typography variant="h5" sx={{ flexGrow: 1 }}>
                                {index + 1}.
                              </Typography>
                              <Button onClick={()=>handleRemoveField(index)}  size="small" variant="outlined">Remove</Button>
                            </Box>
                            <TextField fullWidth />
                          </Paper>
                        );
                      })}
                      <Button onClick={handleAddField} variant="outlined">Add field</Button>
                    </Stack>
                  </Container>
                </Box>
                <Button disableElevation variant="contained">
                  Add field
                </Button>
              </Stack>
            </form>
          </Container>
        </div>
      </Dialog>
    </div>
  );
}