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
import { Container, Divider, Paper, Stack } from "@mui/material";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResourceFormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" fullWidth variant="outlined" onClick={handleClickOpen}>
                Add / Link resources
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
                            Resources
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div>
                    <Toolbar />
                    <Container>
                        <Stack spacing={3} >
                            <Toolbar />
                            <Typography variant="h4" >Resources available to you</Typography>
                            <Toolbar />
                            <Divider />
                            <Button>Create new resource</Button>
                            <Paper  >
                                <Stack spacing={2} >
                                    <Typography variant="h6" >Currently authenticated user</Typography>
                                    <Typography>DataType: Object</Typography>
                                    <Typography>Available Fields</Typography>
                                    <Button>Link resource</Button>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Container>
                </div>
            </Dialog>
        </div>
    );
}
