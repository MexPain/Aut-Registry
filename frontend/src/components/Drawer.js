import {styled} from "@mui/material/styles";
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {forwardRef, useContext, useMemo, useState} from "react";
import {UserContext} from "../contexts/UserContext";
import ConfirmDialog from "./ConfirmDialog";
import {
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer as MuiDrawer,
    ListSubheader
} from "@mui/material";
import {ChevronLeft, Home, Search, TableRows, AddBox, ManageAccounts, PowerSettingsNew, AccountBox, Description} from "@mui/icons-material";
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

    const {currentUser, logOut} = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    const drawer = (
        <div>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeft />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List component="nav"
                  aria-label="main-content-nav"
            >
                <ListItemLink
                    to="/home"
                    primary="Kezdőlap"
                    icon={<Home />}
                    selected={location.pathname === "/home"}
                />
                <ListItemLink
                    to="/search"
                    primary="Tárgyak keresése"
                    icon={<Search />}
                    selected={location.pathname === "/search"}
                />
                <ListItemLink
                    to="/user/myItems"
                    primary="Kölcsönzött tárgyaim"
                    icon={<TableRows />}
                    selected={location.pathname === "/user/myItems"}
                />
            </List>
            <Divider />
            {currentUser && currentUser.roles.includes("ROLE_MODERATOR") && (<>
                <List component="nav"
                      aria-label="main-content-nav"
                      subheader={
                          <ListSubheader component="div" id="mod-actions">
                              Moderátor
                          </ListSubheader>
                      }
                >
                    <ListItemLink
                        to="/newItem"
                        primary="Új tárgy hozzáadása"
                        icon={<AddBox />}
                        selected={location.pathname === "/newItem"}
                    />
                    <ListItemLink
                        to="/newCategories"
                        primary="Új kategória hozzáadása"
                        icon={<AddBox />}
                        selected={location.pathname === "/newCategories"}
                    />
                    <ListItemLink
                        to="/manage/items"
                        primary="Aktív kölcsönzések"
                        icon={<Description />}
                        selected={location.pathname === "/manage/items"}
                    />
                </List>
                <Divider />
            </>)}
            {currentUser && currentUser.roles.includes("ROLE_ADMIN") && (<>
                <List component="nav"
                      aria-label="main-content-nav"
                      subheader={
                          <ListSubheader component="div" id="admin-actions">
                              Adminisztrátor
                          </ListSubheader>
                      }
                >
                    <ListItemLink
                        to="/manage/users"
                        primary="Felhasználók kezelése"
                        icon={<ManageAccounts />}
                        selected={location.pathname === "/manage/users"}
                    />
                </List>
                <Divider />
            </>)}
            <List component="nav" aria-label="user-settings">
                <ListItemLink to="/user/profile" primary="Adataim" icon={<AccountBox />}
                              selected={location.pathname === "/user/profile"} />
                <ListItem button onClick={()=>{
                    setIsDialogVisible(true)
                }}>
                    <ListItemIcon>
                        <PowerSettingsNew />
                    </ListItemIcon>
                    <ListItemText primary="Kijelentkezés" />
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
                title="Kijelentkezés megerősítése"
                message="Biztosan ki szeretne jelentkezni"
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