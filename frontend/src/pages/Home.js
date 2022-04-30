import Item from "./Item";
import {useEffect, useState} from "react";
import {Box, Grid, Paper} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import ItemService from "../services/item.service";

const Home = () => {
    const theme = useTheme()
    const [items, setItems] = useState([])

    const imgHeader = "http://localhost:8080/api"

    useEffect(() => {
        ItemService.getAllItems()
            .then((success)=> {
                console.log(...success.data)
                setItems([...success.data])
            }, (error) => {
                console.log(error)
            })
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <Paper sx={{padding: 2, margin: 'auto',}}>
                <Grid container spacing={2} justifyContent={"space-around"} marginTop={2}>
                    {items.map( (item) => (
                        <Item key={item.id} image={`${imgHeader}${item.images}` || `not-found`} name={item.name}
                              category={item.category} description={item.description}/>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
}
export default Home