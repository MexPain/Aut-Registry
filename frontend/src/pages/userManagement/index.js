import {useEffect, useState} from "react";
import userService from "../../services/user.service";
import {useNavigate} from "react-router-dom";
import {Grid, Paper} from "@mui/material";
import UsersTable from "./UsersTable";
import ConfirmDialog from "../../components/ConfirmDialog";
import RolesFormDialog from "./RolesFormDialog";

export function UserManagement() {

    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);
    const [isChangeDialogVisible, setIsChangeDialogVisible] = useState(false)

    const [selectedUser, setSelectedUser] = useState(undefined)

    useEffect(() => {
        userService.getAllUsers()
            .then(resp => {
                setUsers(resp.data)
                console.log(resp.data)
            })
            .catch(e => {
                e.response.status === 403 && navigate("/forbidden") //TODO forbidden page, ezt máshol is
            })
    }, []);

    const changeRolesClicked = (user) => {
        setSelectedUser(user)
        setIsChangeDialogVisible(true)
    }

    const deleteUserClicked = (user) => {
        setSelectedUser(user)
        setIsDeleteDialogVisible(true)
    }


    return (<>
        <Grid container>
            <Grid item xs={12} lg={10} mx={"auto"}>
                <Paper sx={{padding: 2, margin: 'auto',}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h2>All users</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <UsersTable users={users}
                                        onChangeRoleClick={(user) => changeRolesClicked(user) }
                                        onDeleteUserClick={(user) => deleteUserClicked(user) }
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        { selectedUser && <ConfirmDialog
            isOpen={isDeleteDialogVisible}
            changeIsOpen={(value) => {
                setIsDeleteDialogVisible(value)
                setSelectedUser(undefined)
            }}
            title="Confirm user delete"
            message="Are you sure you want to delete this user?"
            okCallback={ ()=> {
                //service delete user
                console.log("User will be deleted")
            }}
            cancelCallback={ () => {
                //dialog dismissed
                console.log("Nothing will happen")
            }}
        />}
        { selectedUser && <RolesFormDialog
            isOpen={isChangeDialogVisible}
            onClosed={(value) => {
                setIsChangeDialogVisible(value)
                setSelectedUser(undefined)
            }}
            title="Change roles"
            currentRoles={selectedUser.roles}
            message="Select the roles you want for this user!"
            okCallback={ (roles)=> {
                //check if its changed frist
                console.log("The new roles")
                console.log(roles)
            }}
            cancelCallback={ () => {
                //dialog dismissed
                console.log("Nothing will happen")
            }}
        />}
    </>)
}