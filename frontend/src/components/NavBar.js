import {useContext, useEffect, useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {UserContext} from "../contexts/UserContext";
import Popup from "./Popup";
import logo from "../assets/aut.png"
import {
    AppBar as MuiAppBar,
    Avatar,
    Box,
    Button,
    ButtonBase,
    Grid,
    IconButton,
    Toolbar,
    Typography
} from '@mui/material';
import {styled, useTheme} from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import {AccountCircle} from "@mui/icons-material";
import itemService from "../services/item.service";

const drawerWidth = 240;

const AppBarStyled = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const NavBar = ({isDrawerOpen, handleDrawerOpen}) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const {currentUser, login, logOut} = useContext(UserContext)
    const [profilePopup, setProfilePopup] = useState(null)

    const profileClick = (event) => {
        setProfilePopup(event.currentTarget)
    }

    const homeIconClicked = () => {
        navigate("/home")
    }

    const getMonogram = () => {
        let first = currentUser.firstname.substring(0, 1).toUpperCase()
        let last = currentUser.lastname.substring(0, 1).toUpperCase()
        return `${first}${last}`
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBarStyled position="static" open={isDrawerOpen}>
                <Toolbar>
                    {currentUser &&
                    <IconButton
                        edge="start"
                        sx={{ mr: 2, ...(isDrawerOpen && { display: 'none' }) }}
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    }
                    <ButtonBase sx={{height: 40, marginRight: theme.spacing(2)}} onClick={homeIconClicked}>
                        <img alt={"logo img"} src={logo}/>
                    </ButtonBase>
                    <Grid container sx={{flexGrow: 1, alignItems: "center"}}>
                        <Typography variant="h5" color="inherit" sx={{marginRight: theme.spacing(2)}}>Item registry</Typography>

                        <Button size="large" color="inherit" component={RouterLink} to="/about" sx={{flexShrink: 0}}>About us</Button>

                        <Button size="large" color="inherit" component={RouterLink} to="/search" sx={{flexShrink: 0}}>Find items</Button>

                        {currentUser && currentUser.roles.includes("ROLE_MODERATOR") && (<>
                            <Button size="large" color="inherit" component={RouterLink} to="/newItem"
                                    sx={{flexShrink: 0}}>Add items</Button>
                            <Button size="large" color="inherit" component={RouterLink} to="/newCategories" sx={{flexShrink: 0}}>Add categories</Button>
                            </>)}
                    </Grid>
                    {!currentUser &&
                        <Button size="large" color="inherit" component={RouterLink} to="/login" sx={{flexShrink: 0}}>Login</Button>
                    }
                    {!currentUser &&
                        <Button size="large" color="inherit" component={RouterLink} to="/register" sx={{flexShrink: 0}}>Sign up</Button>
                    }
                    {currentUser &&
                        <div>
                            <IconButton
                                aria-label="current user"
                                onClick={profileClick}
                                color="inherit"
                            >
                                {currentUser.imageUrl &&
                                    <Avatar alt="" src={`${itemService.imgHeader}${currentUser.imageUrl}`} />}
                                {!currentUser.imageUrl &&
                                    <Avatar sx={{bgcolor: 'info.dark', color: 'white'}}>{getMonogram()}</Avatar>}
                            </IconButton>
                            <Popup anchorEl={profilePopup} handleClose={() => {setProfilePopup(null)}}/>
                        </div>
                    }
                </Toolbar>
            </AppBarStyled>
        </Box>
    )
}
export default NavBar