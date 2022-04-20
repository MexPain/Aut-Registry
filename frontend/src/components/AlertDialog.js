import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";

export default function AlertDialog({isOpen, changeIsOpen, title, message, okCallback, cancelCallback}) {

    const handleOkClose = () => {
        changeIsOpen(false);
        okCallback()
    };
    const handleCancelClose = () => {
        changeIsOpen(false);
        cancelCallback()
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleCancelClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Typography color="primary" variant="h6">
                    {title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography color="inherit" variant="body2">
                        {message}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelClose} color="primary">
                    No
                </Button>
                <Button onClick={handleOkClose} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}