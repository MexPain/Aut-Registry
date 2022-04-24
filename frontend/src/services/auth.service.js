import api from './api'
import TokenService from "./token.service";

const login = (username, password)=> { //TODO emailre csere ha backend megvan
    return api
        .post("/auth/signin", {
            username,
            password
        })
        .then(response => {
            if (response.data.token) {
                TokenService.setUser(response.data)
            }
            console.log(`Login request successful, response data: ${response.data}`)
            return response.data
        })
}

const logout = ()=> {
    TokenService.removeUser()
    console.log("Log out successful")
}

const register = (
    username,
    email,
    password,
    description,
    phone,
    imageUrl,
    firstname,
    lastname,
    ) => {
    return api.post("/auth/signup", {
        username,
        email,
        password,
        firstname,
        lastname,
        description,
        phone,
        imageUrl,
    });
}

const getCurrentUser = ()=> {
    return TokenService.getUser();
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService