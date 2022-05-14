import Item from "../components/Item";
import {useEffect, useState} from "react";
import {Box, Grid, Paper} from "@mui/material";
import ItemService from "../services/item.service";
import itemService from "../services/item.service";

const Home = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        ItemService.getAvailableItems()
            .then((success)=> {
                console.log(success.data)
                setItems([...success.data])
            })
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <Paper sx={{padding: 2, margin: 'auto',}}>
                <Grid container spacing={2} justifyContent={"space-around"} marginTop={2}>
                    {items.map( (item) => (
                        <Item key={item.id} id={item.id} image={`${itemService.imgHeader}${item.images}` || `not-found`} name={item.name}
                              category={item.category} description={item.description}/>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
}
export default Home