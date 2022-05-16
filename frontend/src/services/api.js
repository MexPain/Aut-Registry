import axios from "axios";
import TokenService from "./token.service";
import EventBus from "./auth/EventBus";
import createAuthRefreshInterceptor from 'axios-auth-refresh';

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

const refreshJwtToken = failedRequest =>
    instance.post("/auth/refreshtoken", {
        refreshToken: TokenService.getLocalRefreshToken()
    }).then(resp => {
        const {token} = resp.data;
        TokenService.updateLocalAccessToken(token);
        failedRequest.response.config.headers["Authorization"] = 'Bearer ' + token
        return Promise.resolve()
    }).catch((_error) => {
        EventBus.dispatch("logout")
        return Promise.reject(_error)
    })

createAuthRefreshInterceptor(instance, refreshJwtToken)

export default instance;