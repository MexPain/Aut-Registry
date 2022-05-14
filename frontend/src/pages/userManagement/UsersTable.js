import {styled} from "@mui/material/styles";
import {
    Grid, Link,
    Paper,
    Table, TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function UsersTable({users, onChangeRoleClick, onDeleteUserClick}) {

    const showRoles = (user) => {
        return (<Grid container justifyContent={"center"}>
            {user.roles.map( role =>
            <Grid item key={role.id}>
                <Typography>{role.name}</Typography>
            </Grid>
        )}
        </Grid>)
    }

    return (<>
        {!users && <Typography mt={5} textAlign={"center"} variant={"body1"}>No user data available</Typography>}
        {users && <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Roles</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, idx) => (
                        <StyledTableRow key={idx}>
                            <StyledTableCell component="th" scope="row">
                                {user.username}
                            </StyledTableCell>
                            <StyledTableCell align="center">{user.email}</StyledTableCell>
                            <StyledTableCell align="center">{showRoles(user)}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Grid container justifyContent={"right"}>
                                    <Grid item>
                                        <Link component="button" variant="body2"
                                              onClick={() => onChangeRoleClick(user)}>
                                            Change roles
                                        </Link>
                                    </Grid>
                                    <Grid item marginLeft={1}>
                                        <Link component="button" variant="body2"
                                              onClick={() => onDeleteUserClick(user)}>
                                            Delete user
                                        </Link>
                                    </Grid>
                                </Grid>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>}

    </>)
}