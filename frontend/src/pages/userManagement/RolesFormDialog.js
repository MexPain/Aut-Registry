import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ToggleButton, ToggleButtonGroup,} from "@mui/material";

export default function RolesFormDialog({isOpen, onClosed, currentRoles, title, message, okCallback, cancelCallback}) {

    const handleOkClose = () => {
        okCallback(roles)
        onClosed(false);
    };
    const handleCancelClose = () => {
        cancelCallback()
        onClosed(false);
    }

    function initRoles() {
        let names = []
        currentRoles.forEach( (role) => {
            names.push(role.name)
        })
        return names
    }

    const [roles, setRoles] = React.useState(initRoles);

    const handleRoleChange = (event, newRoles) => {
        setRoles(newRoles);
    };

    return (
        <Dialog open={isOpen} onClose={handleCancelClose}>
            <DialogTitle color={"primary"}>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText marginBottom={2}>
                    {message}
                </DialogContentText>
                <ToggleButtonGroup
                    value={roles}
                    onChange={handleRoleChange}
                    aria-label="role changing"
                >
                    <ToggleButton color={"primary"} value="ROLE_USER" aria-label="user">
                        Normál felhasználó
                    </ToggleButton>
                    <ToggleButton color={"primary"} value="ROLE_MODERATOR" aria-label="mod">
                        Moderátor
                    </ToggleButton>
                    <ToggleButton color={"primary"} value="ROLE_ADMIN" aria-label="admin">
                        Adminisztrátor
                    </ToggleButton>
                </ToggleButtonGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelClose}>Mégse</Button>
                <Button disabled={roles.length === 0} onClick={handleOkClose}>Módosítás</Button>
            </DialogActions>
        </Dialog>
    );
}