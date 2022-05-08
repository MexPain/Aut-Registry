import {useEffect, useState} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BorrowedItemsContent from "./pages/BorrowedItems";
import Drawer from "./components/Drawer";
import authService from "./services/auth.service";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import {UserContext} from "./contexts/UserContext";
import { styled, useTheme } from '@mui/material/styles';
import NewItemForm from "./pages/NewItemForm";
import AddCategoriesForm from "./pages/AddCategoriesForm";
import EventBus from "./services/auth/EventBus";
import {ItemDetails} from "./pages/ItemDetails";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: drawerWidth,
        }),
    }),
);

const App = () => {

    const theme = useTheme()

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const login = (email, password, success, fail) => {
        authService.login(email, password).then(
            (response) => {
                console.log(`A response: ${response.token}`)
                setCurrentUser(authService.getCurrentUser())
                success()
            },
            (error) => {
                fail()
            }
        )
    }
    const logOut = () => {
        authService.logout()
        setDrawerOpen(false)
        setCurrentUser(undefined)
    }

    const initUser = () => {
        let user = authService.getCurrentUser()
        //TODO check token expiration on server, if valid, keep it, if not undefined
        return user
    }

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(initUser)

    useEffect( () => {
        EventBus.on("logout", () => {
            logOut();
        });
        return () => {
            EventBus.remove("logout");
        };
    }, [])

    return (
        <UserContext.Provider value={{currentUser, login, logOut}}>
            <NavBar isDrawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen}/>
            <Drawer isDrawerOpen={drawerOpen} handleDrawerClose={handleDrawerClose}/>
            <Main open={drawerOpen} theme={theme}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/newItem" element={<NewItemForm/>}/>
                    <Route path="/newCategories" element={<AddCategoriesForm />} />
                    <Route path="/user/myItems"
                           element={currentUser ? <BorrowedItemsContent/> : <Navigate to="/login" state={{error: "yes"}}/>}/>
                    <Route path="/user/profile" element={currentUser ? <UserProfile/> : <Navigate to="/login/expired"/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login/*" element={<Login/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                    <Route path="/items/:id" element={<ItemDetails />} />
                </Routes>
            </Main>
        </UserContext.Provider>
    )
}

export default App;
