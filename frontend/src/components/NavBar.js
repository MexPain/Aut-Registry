import {useContext, useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {UserContext} from "../contexts/UserContext";
import Popup from "./Popup";
import logo from "../assets/aut.png"
import {AppBar as MuiAppBar, Avatar, Box, Button, ButtonBase, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import {styled, useTheme} from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
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
    const {currentUser} = useContext(UserContext)
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
                        <Typography variant="h5" color="inherit" sx={{marginRight: theme.spacing(2)}}>Eszk??zt??r</Typography>

                        <Button size="large" color="inherit" component={RouterLink} to="/about" sx={{flexShrink: 0}}>R??lunk</Button>

                        <Button size="large" color="inherit" component={RouterLink} to="/search" sx={{flexShrink: 0}}>T??rgykeres??s</Button>

                        {currentUser && currentUser.roles.includes("ROLE_MODERATOR") && (<>
                            <Button size="large" color="inherit" component={RouterLink} to="/newItem"
                                    sx={{flexShrink: 0}}>??j t??rgy</Button>
                            <Button size="large" color="inherit" component={RouterLink} to="/newCategories" sx={{flexShrink: 0}}>??j kateg??ria</Button>
                            </>)}
                    </Grid>
                    {!currentUser &&
                        <Button size="large" color="inherit" component={RouterLink} to="/login" sx={{flexShrink: 0}}>Bejelentkez??s</Button>
                    }
                    {!currentUser &&
                        <Button size="large" color="inherit" component={RouterLink} to="/register" sx={{flexShrink: 0}}>Regisztr??ci??</Button>
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
                                    <Avatar sx={{bgcolor: 'white', color: 'primary.main'}}>{getMonogram()}</Avatar>}
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