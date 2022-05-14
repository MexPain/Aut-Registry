import {useState} from "react";
import {
    Button, Grid, Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Link as RouterLink} from "react-router-dom";

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

const BorrowedItemsTable = ({items}) => {

    return (
        <>
            {!items && <Typography mt={5} textAlign={"center"} variant={"body1"}>You currently do not have any borrowed items</Typography>}
            {items && <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Date of borrow</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row, idx) => (
                            <StyledTableRow key={idx}>
                                <StyledTableCell component="th" scope="row">
                                    {row.item.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.lentAt}</StyledTableCell>
                                <StyledTableCell align="center">Ide jon a status</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Grid container justifyContent={"right"}>
                                        <Grid item>
                                            <Link color="secondary" component={RouterLink} to="/home" variant="body2">
                                                Send reminder
                                            </Link>
                                        </Grid>
                                        <Grid item marginLeft={1}>
                                            <Link color="secondary" component={RouterLink} to="/home" variant="body2">
                                                Reclaim
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    )
}
export default BorrowedItemsTable