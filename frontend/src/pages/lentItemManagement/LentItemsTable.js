import {
    Grid,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell, tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Typography
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

export default function LentItemsTable({lendings, onSendReminderClick, onReclaimClick}) {

    return (<>
        {lendings.length === 0 && <Typography mt={5} textAlign={"center"} variant={"body1"}>Jelenleg senki sem kölcsönzött ki egy tárgyat sem</Typography>}
        {lendings.length > 0 && <TableContainer component={Paper}>
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
                    {lendings.map((item, idx) => (
                        <StyledTableRow key={idx}>
                            <StyledTableCell component="th" scope="row">
                                {item.userName}
                            </StyledTableCell>
                            <StyledTableCell align="center">{item.itemName}</StyledTableCell>
                            <StyledTableCell align="center">{dateConverter(item.lentAt)}</StyledTableCell>
                            <StyledTableCell align="center">{statusConverter(item.status)}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Grid container justifyContent={"right"}>
                                    <Grid item marginLeft={1}>
                                        <Link component="button" variant="body2"
                                              onClick={() => onReclaimClick(item)}>
                                            Visszavétel
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