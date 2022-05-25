import {
    Grid, Link, Paper, Table, TableBody, TableCell, tableCellClasses,
    TableContainer, TableHead, TableRow, Typography
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {dateConverter, statusConverter} from "../../utils/Converters";

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

const BorrowedItemsTable = ({items, onCancelClick}) => {

    return (
        <>
            {!items && <Typography mt={5} textAlign={"center"} variant={"body1"}>Jelenleg nincs kölcsönzött tárgyad</Typography>}
            {items && <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Név</StyledTableCell>
                            <StyledTableCell align="center">Kölcsönzés dátuma</StyledTableCell>
                            <StyledTableCell align="center">Állapot</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row, idx) => (
                            <StyledTableRow key={idx}>
                                <StyledTableCell component="th" scope="row">
                                    {row.itemName}
                                </StyledTableCell>
                                <StyledTableCell align="center">{dateConverter(row.lentAt)}</StyledTableCell>
                                <StyledTableCell align="center">{statusConverter(row.status)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    )
}
export default BorrowedItemsTable