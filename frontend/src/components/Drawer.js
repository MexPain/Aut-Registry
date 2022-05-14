import {styled, useTheme} from "@mui/material/styles";
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {forwardRef, useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {UserContext} from "../contexts/UserContext";
import ConfirmDialog from "./ConfirmDialog";
import {Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Drawer as MuiDrawer} from "@mui/material";
import {ChevronLeft} from "@mui/icons-material";
import InboxIcon from '@mui/icons-material/MoveToInbox';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    selected: PropTypes.bool,
};

function ListItemLink(props) {
    const { icon, primary, to, selected, onClick } = props;

    const renderLink = useMemo(
        () => forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink} selected={selected} onClick={onClick}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}


const Drawer = ({isDrawerOpen, handleDrawerClose}) => {

    const {currentUser, login, logOut} = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    // const handleListItemClick = (event, path) => {
    //     setSelectedIndex(index);
    // };

    const drawer = (
        <div>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeft />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List component="nav" aria-label="main-content-nav">
                <ListItemLink
                    to="/home"
                    primary="Home"
                    icon={<InboxIcon />}
                    selected={location.pathname === "/home"}
                />
                <ListItemLink
                    to="/user/myItems"
                    primary="Borrowed items"
                    icon={<InboxIcon />}
                    selected={location.pathname === "/user/myItems"}
                />
                <ListItemLink
                    to="/about"
                    primary="Manage subscriptions"
                    icon={<InboxIcon />}
                    selected={location.pathname === "/about"}
                />
            </List>
            <Divider />
            {currentUser && currentUser.roles.includes("ROLE_MODERATOR") && (<>
                <List component="nav" aria-label="main-content-nav">
                    <ListItemLink
                        to="/newItem"
                        primary="Add new item"
                        icon={<InboxIcon />}
                        selected={location.pathname === "/newItem"}
                    />
                    <ListItemLink
                        to="/newCategories"
                        primary="Add new categories"
                        icon={<InboxIcon />}
                        selected={location.pathname === "/newCategories"}
                    />
                    <ListItemLink
                        to="/manage/items"
                        primary="Manage lent items"
                        icon={<InboxIcon />}
                        selected={location.pathname === "/manage/items"}
                    />
                </List>
                <Divider />
            </>)}
            {currentUser && currentUser.roles.includes("ROLE_ADMIN") && (<>
                <List component="nav" aria-label="main-content-nav">
                    <ListItemLink
                        to="/manage/users"
                        primary="Manage users"
                        icon={<InboxIcon />}
                        selected={location.pathname === "/manage/users"}
                    />
                </List>
                <Divider />
            </>)}
            <List component="nav" aria-label="user-settings">
                <ListItemLink to="/user/profile" primary="Profile settings" icon={<InboxIcon />}
                              selected={location.pathname === "/user/profile"} />
                <ListItem button onClick={()=>{
                    console.log("Clicked")
                    setIsDialogVisible(true)
                }}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                </ListItem>
            </List>
        </div>
    )

    return(
        <div>
            <MuiDrawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={isDrawerOpen}
            >{drawer}
            </MuiDrawer>
            <ConfirmDialog
                isOpen={isDialogVisible}
                changeIsOpen={(value) => {setIsDialogVisible(value)}}
                title="Confirm log out"
                message="Are you sure you want to log out?"
                okCallback={ ()=> {
                    logOut()
                    navigate("/home")
                }}
                cancelCallback={ () => {
                    //dialog dismissed
                }}
            />

        </div>
    )
}

export default Drawer