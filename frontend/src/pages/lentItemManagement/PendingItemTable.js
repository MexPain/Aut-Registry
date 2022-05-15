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

export default function PendingItemsTable({items, onAcceptedClick, onDeniedClick}) {

    return (<>
        {items.length === 0 && <Typography mt={5} textAlign={"center"} variant={"body1"}>No pending requests at the moment</Typography>}
        {items.length > 0 && <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell>Item name</StyledTableCell>
                        <StyledTableCell align="center">Borrowed at</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((data, idx) => (
                        <StyledTableRow key={idx}>
                            <StyledTableCell component="th" scope="row">
                                {data.userName}
                            </StyledTableCell>
                            <StyledTableCell align="center">{data.itemName}</StyledTableCell>
                            <StyledTableCell align="center">{data.lentAt}</StyledTableCell>
                            <StyledTableCell align="center">{data.status}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Grid container justifyContent={"right"}>
                                    <Grid item>
                                        <Link component="button" variant="body2"
                                              onClick={() => onAcceptedClick(data)}>
                                            Accept
                                        </Link>
                                    </Grid>
                                    <Grid item marginLeft={1}>
                                        <Link component="button" variant="body2"
                                              onClick={() => onDeniedClick(data)}>
                                            Deny
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