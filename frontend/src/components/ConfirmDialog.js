import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";

export default function ConfirmDialog({isOpen, changeIsOpen, title, message, okCallback, cancelCallback}) {

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
            <DialogTitle color={"primary"} id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
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