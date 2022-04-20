import {useContext, useEffect, useState} from "react";
import {Link as RouterLink} from "react-router-dom";
import {
    AppBar, Box,
    Button, Grid,
    IconButton,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {AccountCircle,} from "@material-ui/icons";
import clsx from "clsx";
import authService from "../services/auth.service";
import {UserContext} from "../contexts/UserContext";
import Popup from "./Popup";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    navMain: {
        flexGrow: 1,
        alignItems: "center",
    },
    title: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerButton: {
        marginRight: theme.spacing(2),
    },
    menuButton: {
        flexShrink: 0,
    },
    hide: {
        display: 'none',
    },
    logo: {
        height: 40,
        marginRight: theme.spacing(2),
    }

 }));

const NavBar = ({isDrawerOpen, handleDrawerOpen}) => {
    const classes = useStyles();
    const {currentUser, login, logOut} = useContext(UserContext)

    const [profilePopup, setProfilePopup] = useState(null)

    const profileClick = (event) => {
        setProfilePopup(event.currentTarget)
    }

    const defaultBar = () => {
        return (
            <Toolbar>
                <Box
                    className={classes.logo}
                    component="img"
                    alt={"logo img"}
                    src={"/images/aut.png"}
                />
                <Grid container className={classes.navMain}>
                    <Typography variant="h5" color="inherit" className={classes.title}>Item registry</Typography>
                    <Button size="large" color="inherit" component={RouterLink} to="/about" className={classes.menuButton}>About us</Button>
                </Grid>
                <Button size="large" color="inherit" component={RouterLink} to="/login" className={classes.menuButton}>Login</Button>
                <Button size="large" color="inherit" component={RouterLink} to="/register" className={classes.menuButton}>Sign up</Button>
            </Toolbar>
        )
    }

    const userBar = () => {

    }

    return (
        <div className={classes.root}>
            <AppBar position="static"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: isDrawerOpen,
                    })}
            >
                <Toolbar>
                    {currentUser &&
                    <IconButton
                        edge="start"
                        className={clsx(classes.drawerButton, isDrawerOpen && classes.hide)}
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    }
                    <Box
                        className={classes.logo}
                        component="img"
                        alt={"logo img"}
                        src={"/images/aut.png"}
                    />
                    <Grid container className={classes.navMain}>
                        <Typography variant="h5" color="inherit" className={classes.title}>Item registry</Typography>
                        <Button size="large" color="inherit" component={RouterLink} to="/about" className={classes.menuButton}>About us</Button>
                    </Grid>
                    {!currentUser &&
                        <Button size="large" color="inherit" component={RouterLink} to="/login"
                                className={classes.menuButton}>Login</Button>
                    }
                    {!currentUser &&
                        <Button size="large" color="inherit" component={RouterLink} to="/register"
                            className={classes.menuButton}>Sign up</Button>
                    }
                    {currentUser &&
                        <div>
                            <IconButton
                                aria-label="current user"
                                onClick={profileClick}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Popup anchorEl={profilePopup} handleClose={() => {setProfilePopup(null)}}/>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default NavBar