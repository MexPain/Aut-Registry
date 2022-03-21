import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/"

const register = (username, password) => {  //TODO add additional info
    //return axios.post(API_URL + "signup", {username, password})
    console.log("User registered: " + username + "with password: " + password)
}

const login = (username, password) => {
    // return axios.post(API_URL + "signin", {username, password})
    //     .then((response) => {
    //         if(response.data.accessToken) {
    //             localStorage.setItem("user", JSON.stringify(response.data))
    //         }
    //         return response.data
    //     })
    console.log("Login request sent for " + username)
}

const logout = () => {
    //localStorage.removeItem("user")
}

const getCurrentUser = () => {
    //return JSON.parse(localStorage.getItem("user"))
}

export default {register, login, logout, getCurrentUser}