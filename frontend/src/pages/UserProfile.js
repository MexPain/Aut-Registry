import React, {useEffect, useState} from "react"
import userService from "../services/user.service";
import {Avatar, Grid, Paper, Typography} from "@mui/material";
import itemService from "../services/item.service";

const UserProfile = () => {

    const [userData, setUserData] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        userService.getProfileDetails().then(
            (response) => {
                setUserData(response.data)
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
    },[])

    const getMonogram = () => {
        let first = userData.firstname.substring(0, 1).toUpperCase()
        let last = userData.lastname.substring(0, 1).toUpperCase()
        return `${first}${last}`
    }

    return (
        <Grid container>
            {userData && <Grid item xs={12} lg={10} mx={"auto"}>
                <Paper sx={{padding: 2, margin: 'auto',}}>
                    <Grid container spacing={3} alignItems={"center"}>
                        <Grid item xs={4}>
                            {userData.imageUrl && <Avatar alt="Avatar" sx={{ width: 200, height: 200, margin: "auto" }} src={`${itemService.imgHeader}${userData.imageUrl}`}/>}
                            {!userData.imageUrl && <Avatar alt="Avatar" sx={{ width: 200, height: 200, fontSize: 50, margin: "auto" }} >{getMonogram()}</Avatar>}
                        </Grid>
                        <Grid item xs={8}>
                            <Paper sx={{padding: 2, margin: 'auto',}}>
                                <Typography mb={2} variant={"h4"}>{userData.username}</Typography>

                                <Typography fontWeight={"bold"} variant={"body1"}>Email cím:</Typography>
                                <Typography mb={1} pl={1} variant={"body1"}>{userData.email || '-'}</Typography>

                                <Typography fontWeight={"bold"} variant={"body1"}>Vezetéknév: </Typography>
                                <Typography mb={1} pl={1} variant={"body1"}>{userData.lastname || '-'}</Typography>

                                <Typography fontWeight={"bold"} variant={"body1"}>Keresztnév:</Typography>
                                <Typography mb={1} pl={1} variant={"body1"}>{userData.firstname || '-'}</Typography>

                                <Typography fontWeight={"bold"} variant={"body1"}>Telefonszám:</Typography>
                                <Typography mb={1} pl={1} variant={"body1"}>{userData.phone || '-'}</Typography>

                                <Typography fontWeight={"bold"} variant={"body1"}>Bemutatkozás: </Typography>
                                <Typography mb={1} pl={1} variant={"body1"}>{userData.description || '-'}</Typography>

                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>}
        </Grid>
    )

}
export default UserProfile