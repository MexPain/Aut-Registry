import React, {forwardRef, useContext, useMemo, useState} from 'react';
import {List, ListItem, ListItemText, Popover} from "@mui/material";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import {UserContext} from "../contexts/UserContext";

function ListItemLink({primary, to, onClick}) {

    const renderLink = useMemo(
        () => forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink} onClick={onClick}>
                <ListItemText primary={primary}/>
            </ListItem>
        </li>
    );
}

export default function Popup({anchorEl, handleClose}) {

    const navigate = useNavigate()
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const { logOut } = useContext(UserContext)

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (<>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <List disablePadding>
                <ListItemLink primary="Profile settings" to="/user/profile"
                              onClick={ () => {handleClose()}}/>

                <ListItem button onClick={() => {
                    setIsDialogVisible(true)
                }}>
                    <ListItemText primary="Log out"/>
                </ListItem>
            </List>
        </Popover>
        <ConfirmDialog
            isOpen={isDialogVisible}
            changeIsOpen={(value) => {
                setIsDialogVisible(value)
            }}
            title="Confirm log out"
            message="Are you sure you want to log out?"
            okCallback={() => {
                logOut()
                handleClose()
                navigate("/home")
            }}
            cancelCallback={() => {
                //dialog dismissed
            }}
        />
    </>);
}