import axios from "axios";
import TokenService from "./token.service";
import EventBus from "./auth/EventBus";

const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    }
})

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken()
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (res) => {
        return res
    },
    (err) => {
        const originalConfig = err.config
        if (originalConfig.url !== "/auth/signin" && err.response) {
            if (err.response.status === 401 && Boolean(TokenService.getUser()) && !originalConfig._retry) {
                originalConfig._retry = true
                instance.post("/auth/refreshtoken", {
                    refreshToken: TokenService.getLocalRefreshToken()
                }).then(resp => {
                    const {token} = resp.data;
                    TokenService.updateLocalAccessToken(token);
                    console.log(originalConfig)
                    originalConfig.headers["Authorization"] = 'Bearer ' + token
                    return instance(originalConfig);
                }).catch((_error) => {
                    console.log("Logout dispatch now starts")
                    EventBus.dispatch("logout")
                    return Promise.reject(_error)
                })
            }
        }
        console.log("return reject without changing")
        return Promise.reject(err)
    }
)
export default instance;