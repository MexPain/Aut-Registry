import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles
} from "@material-ui/core";
import {itemsList} from "../../utils/ItemsListTemp";
import {useState} from "react";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.contrastText,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const BorrowedItemsTable = () => {

    const classes = useStyles();
    const [items, setItems] = useState(itemsList);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Date of borrow</StyledTableCell>
                        <StyledTableCell align="right">Expires at</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.dateOfBorrow}</StyledTableCell>
                            <StyledTableCell align="right">{row.expirationDate}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default BorrowedItemsTable