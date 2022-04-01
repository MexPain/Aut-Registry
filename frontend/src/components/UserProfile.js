import {Alert, Container, Row} from "react-bootstrap"
import React, {useEffect, useState} from "react"
import AuthService from "../services/auth.service"
import userService from "../services/user.service";
import authService from "../services/auth.service";

const UserProfile = () => {

    const [currentUser, setCurrentUser] = useState("")
    const [userData, setUserData] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect( () => {
        setCurrentUser(authService.getCurrentUser())
        userService.getProfileDetails().then(
            (response) => {
                setUserData(response.data.message)
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setErrorMessage(resMessage);
            }
        )
    })

    return(
        <Container>
            <h1>{userData.username}'s Profile</h1>
            <h3>{currentUser}</h3>
            {!!errorMessage && (<Row>
                Name: {userData.firstname} {userData.lastname}
            </Row>)}
            {errorMessage && (<Alert>
                {errorMessage}
            </Alert>)}
        </Container>
    )

}
export default UserProfile