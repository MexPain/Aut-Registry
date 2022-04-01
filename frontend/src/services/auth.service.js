import axios from "axios";

const API_URL = "http://localhost:8080/api/users/"

const register = (username, password, firstname, lastname) => {  //TODO add additional info
    return axios.post(
        API_URL + "signup",
        {username, password, firstname, lastname})
    // console.log("User registered: " + username + "with password: " + password)
}

const login = (username, password) => {
    return axios.post(
        API_URL + "signin",
        {username, password})
        .then((response) => {
            if(response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data))
            }
            let token = localStorage.getItem("user")
            token ? console.log(token) : console.log("fuked")
            return response.data
        })
        .catch((error) => {
            console.log(error)
        })
    // console.log("Login request sent for " + username)
}

const logout = () => {
    localStorage.removeItem("user")
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

export default {register, login, logout, getCurrentUser}