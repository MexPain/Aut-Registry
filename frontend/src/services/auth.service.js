import axios from "axios";

const API_URL = "http://localhost:8080/api/users/"

const register = (email, password, firstname, lastname) => {  //TODO add additional info (profilePic)
    // return axios.post(
    //     API_URL + "signup",
    //     {username, password, firstname, lastname})

    //regi registerből:
    // authService.register(username, password, firstname, lastname).then(
    //     (response) => {
    //         setMessage(response.data.message);
    //         setSuccessful(true);
    //     },
    //     (error) => {
    //         const resMessage =
    //             (error.response &&
    //                 error.response.data &&
    //                 error.response.data.message) ||
    //             error.message ||
    //             error.toString();
    //         setMessage(resMessage);
    //         setSuccessful(false);
    //     }
    // )

    console.log("User registered: " + firstname+ " " + lastname + " with email: " + email)

    return {    //TODO temp + talán már itt lekezelni a promise-t, mint a loginnal
        id: 10,
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        profilePic: "/images/yt.png",
        roles: ["user"]
    }

}

const login = (username, password) => {
    return axios.post(
        API_URL + "signin",
        {username, password})
        .then((response) => {
            console.log(`Login request successful, response data: ${response.data}`)
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data)) //TODO attol fugg mit ad vissza
            }
            return response.data
        })
        .catch((error) => {
            console.log(error)
        })
}

const logout = () => {
    localStorage.removeItem("user")
    console.log("Log out successful")
}

const getCurrentUser = () => {
    let user = JSON.parse(localStorage.getItem("user"))
    return (user && user.token) || undefined;
};

export default {register, login, logout, getCurrentUser}