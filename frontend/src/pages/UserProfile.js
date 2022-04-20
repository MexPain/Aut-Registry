import React, {useEffect, useState} from "react"
import AuthService from "../services/auth.service"
import userService from "../services/user.service";
import authService from "../services/auth.service";

const UserProfile = () => {

    const [currentUser, setCurrentUser] = useState("")
    const [userData, setUserData] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState("")

    // useEffect( () => {
    //     setCurrentUser(authService.getCurrentUser())
    //     userService.getProfileDetails().then(
    //         (response) => {
    //             setUserData(response.data.message)
    //         },
    //         (error) => {
    //             const resMessage =
    //                 (error.response &&
    //                     error.response.data &&
    //                     error.response.data.message) ||
    //                 error.message ||
    //                 error.toString();
    //             setErrorMessage(resMessage);
    //         }
    //     )
    // })

    return(
        <div>Profile here...</div>
    )

}
export default UserProfile