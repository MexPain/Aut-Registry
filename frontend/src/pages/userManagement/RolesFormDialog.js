import React, {useEffect} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";

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

    useEffect( () => {
        console.log(currentRoles)
    },[])

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
                        Regular user
                    </ToggleButton>
                    <ToggleButton color={"primary"} value="ROLE_MODERATOR" aria-label="mod">
                        Moderator
                    </ToggleButton>
                    <ToggleButton color={"primary"} value="ROLE_ADMIN" aria-label="admin">
                        Administrator
                    </ToggleButton>
                </ToggleButtonGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelClose}>Cancel</Button>
                <Button disabled={roles.length === 0} onClick={handleOkClose}>Apply changes</Button>
            </DialogActions>
        </Dialog>
    );
}