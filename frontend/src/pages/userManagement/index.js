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
            })
            .catch(e => {
                e.response.status === 403 && navigate("/forbidden") //TODO forbidden page, ezt máshol is
            })
    }, []);

    useEffect(() => {
    }, [users])

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
                let currentUser = selectedUser
                userService.deleteUser(selectedUser.id)
                    .then(resp => {
                        setUsers( current => current.filter( user => user.id !== currentUser.id))
                    })
                    .catch(e => console.log(e))
            }}
            cancelCallback={ () => {
                //dialog dismissed
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
                let currentUser = selectedUser
                //check if its changed
                let currentNames = currentUser.roles.map( role => role.name)
                if(roles.length !== currentNames.length || !roles.every(roleName => currentNames.includes(roleName))) {
                    userService.changeUserRoles(currentUser.id, roles)
                        .then( resp => {
                            setUsers( (current) => {
                                let changedIdx = current.indexOf(currentUser)
                                return current.map( (user, idx) => {
                                    return idx === changedIdx ? resp.data : user
                                })
                            })
                        })
                        .catch(e => console.log(e))
                }
            }}
            cancelCallback={ () => {
                //dialog dismissed
            }}
        />}
    </>)
}