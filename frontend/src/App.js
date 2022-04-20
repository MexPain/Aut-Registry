import {useState} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BorrowedItemsContent from "./pages/BorrowedItems";
import clsx from "clsx";
import {createTheme, makeStyles, ThemeProvider} from "@material-ui/core";
import Drawer from "./components/Drawer";
import authService from "./services/auth.service";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import {UserContext} from "./contexts/UserContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
}));

const theme = createTheme({
    palette: {
        primary: {
            light: '#ad3345',
            main: '#990017',
            dark: '#6b0010',
            contrastText: '#fff',
        },
        secondary: {
            light: '#38688d',
            main: '#074371',
            dark: '#042e4f',
            contrastText: '#fff',
        },
    },
});

const App = () => {

    const classes = useStyles()

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

    return (
        <ThemeProvider theme={theme}>
            <UserContext.Provider value={{currentUser, login, logOut}}>
                <NavBar isDrawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen}/>
                <Drawer isDrawerOpen={drawerOpen} handleDrawerClose={handleDrawerClose}/>
                <main className={clsx(classes.content, {
                    [classes.contentShift]: drawerOpen,
                })}>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/home" element={<Home />}/>
                        <Route path="/about" element={<About />}/>
                        <Route path="/user/myItems" element={currentUser ? <BorrowedItemsContent /> : <Navigate to="/login" />}/>
                        <Route path="/user/profile" element={currentUser ? <UserProfile /> : <Navigate to="/login" />}/>
                        <Route path="/register" element={<Register />}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </main>

            </UserContext.Provider>
        </ThemeProvider>
    )
}

export default App;
