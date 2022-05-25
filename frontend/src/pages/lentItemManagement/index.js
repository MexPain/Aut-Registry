import {Grid, Paper} from "@mui/material";
import {useEffect, useState} from "react";
import itemService from "../../services/item.service";
import {useNavigate} from "react-router-dom";
import LentItemsTable from "./LentItemsTable";
import PendingItemsTable from "./PendingItemTable";

export default function LentItemManagement() {

    const navigate = useNavigate()
    const [borrowedItems, setBorrowedItems] = useState([])
    const [pendingItems, setPendingItems] = useState([])

    useEffect(() => {
        itemService.getAllBorrowedItems()
            .then(resp => {
                setBorrowedItems([...resp.data])
            })
            .catch(e => {
                e.response.status === 403 && navigate("/forbidden")
            })
        itemService.getAllPendingItems()
            .then(resp => {
                setPendingItems([...resp.data])
            })
            .catch(e => {
                e.response.status === 403 && navigate("/forbidden")
            })
    }, []);

    const reclaimClicked = (item) => {
        itemService.reclaimItem(item.itemId)
            .then( (resp) => {
                setBorrowedItems(current =>
                    current.filter( currentItem =>
                        currentItem.itemId !== item.itemId
                    )
                )
            })
            .catch(e => console.log(e.response))
    }

    const reminderClicked = (item) => {
        console.log(`reminded: ${item.userName}`)
    }

    const acceptedClicked = (item) => {
        itemService.changeItemStatus(item.itemId)
            .then(resp => {
                setPendingItems(current =>
                    current.filter( currentItem =>
                        currentItem.itemId !== item.itemId
                    )
                )
                setBorrowedItems( (current) => (
                    [...current, resp.data]
                ))
            })
            .catch(e => console.log(e.response))
    }

    const deniedClicked = (item) => {
        itemService.reclaimItem(item.itemId)
            .then( (resp) => {
                setPendingItems(current =>
                    current.filter( currentItem =>
                        currentItem.itemId !== item.itemId
                    )
                )
            })
            .catch(e => console.log(e.response))
    }

    return (<>
        <Grid container spacing={5}>
            <Grid item xs={12} lg={10} mx={"auto"}>
                <Paper sx={{padding: 2, margin: 'auto',}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h2>Függőben lévő kölcsönzések</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <PendingItemsTable items={pendingItems}
                                               onAcceptedClick={(item) => acceptedClicked(item)}
                                               onDeniedClick={(item) => deniedClicked(item)}/>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={10} mx={"auto"}>
                <Paper sx={{padding: 2, margin: 'auto',}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <h2>Kikölcsönzött tárgyak</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <LentItemsTable lendings={borrowedItems}
                                            onReclaimClick={(item) => reclaimClicked(item)}
                                            onSendReminderClick={(item) => reminderClicked(item)}/>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </>)
}