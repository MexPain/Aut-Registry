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

export default function PendingItemsTable({items, onAcceptedClick, onDeniedClick}) {

    return (<>
        {items.length === 0 && <Typography mt={5} textAlign={"center"} variant={"body1"}>Jelenleg nincs beavatkozásra váró kölcsönzés</Typography>}
        {items.length > 0 && <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Felhasználó</StyledTableCell>
                        <StyledTableCell align="center">Tárgynév</StyledTableCell>
                        <StyledTableCell align="center">Kölcsönzés dátuma</StyledTableCell>
                        <StyledTableCell align="center">Állapot</StyledTableCell>
                        <StyledTableCell align="right">Akciók</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((data, idx) => (
                        <StyledTableRow key={idx}>
                            <StyledTableCell component="th" scope="row">
                                {data.userName}
                            </StyledTableCell>
                            <StyledTableCell align="center">{data.itemName}</StyledTableCell>
                            <StyledTableCell align="center">{dateConverter(data.lentAt)}</StyledTableCell>
                            <StyledTableCell align="center">{statusConverter(data.status)}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Grid container justifyContent={"right"}>
                                    <Grid item>
                                        <Link component="button" variant="body2"
                                              onClick={() => onAcceptedClick(data)}>
                                            Elfogadás
                                        </Link>
                                    </Grid>
                                    <Grid item marginLeft={1}>
                                        <Link component="button" variant="body2"
                                              onClick={() => onDeniedClick(data)}>
                                            Elutasítás
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