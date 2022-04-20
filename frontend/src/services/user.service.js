import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/users/"

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

// const getProfileDetails = () => {
//     return axios.get(API_URL + "profile", { headers: authHeader()})
// }

//TODO lend item, ...

export default {getCurrentUser}