import {
    Drawer as MuiDrawer,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
} from "@material-ui/core";
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {ChevronLeft, MoveToInbox as InboxIcon} from "@material-ui/icons";
import {forwardRef, useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {UserContext} from "../contexts/UserContext";
import AlertDialog from "./AlertDialog";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}))

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

    const classes = useStyles();
    const {currentUser, login, logOut} = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    // const handleListItemClick = (event, path) => {
    //     setSelectedIndex(index);
    // };

    const drawer = (
        <div>
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeft />
                </IconButton>
            </div>
            <Divider />
            <List component="nav" aria-label="main-content-nav">
                <ListItemLink
                    to="/home"
                    primary="News"
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
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={isDrawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >{drawer}
            </MuiDrawer>
            <AlertDialog
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