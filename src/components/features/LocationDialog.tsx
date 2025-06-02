import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function LocationDialog() {
    // 1. Manage open/close state
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // 2. If user clicks “Yes,” request navigator.geolocation
    const handleYes = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("Latitude:", position.coords.latitude);
                    console.log("Longitude:", position.coords.longitude);
                    handleClose();
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    handleClose();
                }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
            handleClose();
        }
    };

    useEffect(() => { setOpen(true) }, [])

    return (
        <>

            {/* The dialog itself */}
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="geo-permission-dialog-title"
            >
                <DialogTitle id="geo-permission-dialog-title">
                    Allow Geolocation?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To show you nearby results, we need access to your location. Do you
                        want to allow location access?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleYes} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
