import BorrowedItemsTable from "./BorrowedItemsTable";
import {useEffect, useState} from "react";
import userService from "../../services/user.service";
import {Grid, Link, Paper} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const BorrowedItemsContent = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        userService.getBorrowedItemsOfUser()
            .then(resp => {
                setItems(resp.data)
            })
            .catch(e => {
                e.response.status === 404 && setItems(undefined)
            })
    }, [])

    return (
        <Grid container>
            <Grid item xs={12} lg={10} mx={"auto"}>
                <Paper sx={{padding: 2, margin: 'auto',}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h2>Your borrowed items</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <BorrowedItemsTable items={items}/>
                        </Grid>
                        <Grid item my={3} xs={12} mx={2}>
                            <Link color="secondary" component={RouterLink} to="/home" variant="body2">
                                Find items for your needs
                            </Link>
                        </Grid>

                    </Grid>
                </Paper>

            </Grid>

        </Grid>
    )
}
export default BorrowedItemsContent