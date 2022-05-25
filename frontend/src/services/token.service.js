const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    //console.log(`User parsed for refreshtoken, user: ${localStorage.getItem("user")}`)
    return user?.refreshToken
}

const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    //console.log(`User parsed for accessToken, user: ${localStorage.getItem("user")}`)
    return user?.token
}

const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"))
    //console.log(`User parsed for changing accessToken, the new ac: ${token}`)
    user.token = token
    localStorage.setItem("user", JSON.stringify(user))
}

const getUser = () => {
    let user = JSON.parse(localStorage.getItem("user"))
    //console.log(`User parsed for regular use , user: ${localStorage.getItem("user")}`)
    return user || undefined
}

const setUser = (user) => {
    //console.log(`Setting new user, ${JSON.stringify(user)}`)
    localStorage.setItem("user", JSON.stringify(user))
}

const removeUser = () => {
    //console.log("Deleting current user...")
    localStorage.removeItem("user");
}

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
}

export default TokenService