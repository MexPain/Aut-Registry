import './App.css';
import {useState} from "react";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/profile" element={<UserProfile />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login />}/>
            </Routes>

        </>
    )
}

export default App;
