import Item from "./Item";
import {useContext, useEffect, useState} from "react";
import {itemsList} from "../utils/ItemsListTemp";
import {Box, Grid, Paper} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const Home = () => {
    const theme = useTheme()
    const [items, setItems] = useState(itemsList)

    return (
        <Box sx={{flexGrow: 1}}>
            <Paper sx={{padding: theme.spacing(2), margin: 'auto',}}>
                <Grid container spacing={2} justifyContent={"space-around"}>
                    {items.map( (item) => (
                        <Item key={item.id} image={item.images[0] || `not-found`} name={item.name}
                              category={item.category} description={item.description}/>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
}
export default Home