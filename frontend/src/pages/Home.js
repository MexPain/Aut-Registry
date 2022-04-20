import {ButtonBase, Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import Item from "./Item";
import {useContext, useEffect, useState} from "react";
import {itemsList} from "../utils/ItemsListTemp";
import {UserContext} from "../App";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

const Home = () => {
    const classes = useStyles();
    const [items, setItems] = useState(itemsList)

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2} justifyContent={"space-around"}>
                    {items.map( (item) => (
                        <Item key={item.id} image={item.images[0] || `not-found`} name={item.name}
                              category={item.category} description={item.description}/>
                    ))}
                </Grid>
            </Paper>
        </div>
    );
}
export default Home