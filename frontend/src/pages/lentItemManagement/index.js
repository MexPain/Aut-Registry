import {Grid, Paper} from "@mui/material";
import {useEffect, useState} from "react";
import itemService from "../../services/item.service";
import {useNavigate} from "react-router-dom";
import LentItemsTable from "./LentItemsTable";

export default function LentItemManagement() {

    const navigate = useNavigate()
    const [items, setItems] = useState([])

    useEffect(() => {
        itemService.getAllBorrowedItems()
            .then( resp => {
                console.log(resp.data)
                setItems(resp.data)
            })
            .catch(e => {
                console.log(e.response.message)
                e.response.status === 403 && navigate("/forbidden")
            })
    }, []);

    const reclaimClicked = (item) => {
        console.log(`reclaimed: ${item.itemName}`)
    }

    const reminderClicked = (item) => {
        console.log(`reminded: ${item.userName}`)
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
                            <LentItemsTable lendings={items}
                            onReclaimClick={(item) => reclaimClicked(item)}
                            onSendReminderClick={(item) => reminderClicked(item)}/>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </>)
}