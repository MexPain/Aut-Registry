import {Button, Grid} from "@mui/material";

export function FileHeader({file, onDelete}) {
    return (
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
            <Grid item>{file.name}</Grid>
            <Grid item><Button size="small" onClick={() => onDelete(file)}>Delete</Button></Grid>
        </Grid>
    )
}