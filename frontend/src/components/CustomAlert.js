import {Alert, Collapse, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useEffect, useState} from "react";

export default function CustomAlert({success, error, ...otherProps}) {

    const [open, setOpen] = useState(false)

    const configAlert = {
        ...otherProps,
    }

    if(success) {
        configAlert.severity = "success"
        configAlert.children = success
    }

    if(error) {
        configAlert.severity = "error"
        configAlert.children = error
    }

    useEffect(() => {
        if(success || error) setOpen(true)
    }, [success, error]);


    return (
        <Collapse in={open}>
            <Alert {...configAlert}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            />
        </Collapse>
    )
}