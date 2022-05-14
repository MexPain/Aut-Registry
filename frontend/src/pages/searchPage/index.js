import {Grid, Paper, Typography} from "@mui/material";
import SearchForm from "./SearchForm";
import {useEffect, useState} from "react";
import itemService from "../../services/item.service";
import Item from "../../components/Item";

export default function SearchPage() {

    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])
    const [isSearched, setIsSearched] = useState(false)

    useEffect(() => {
        itemService.getCategories()
            .then( (resp) => {
                setCategories([...resp.data])
            })
    }, []);


    const searchButtonPressed = ({searchText, categorySelect}) => {
        itemService.searchItems(searchText, categorySelect)
            .then( (resp) => {
                setItems(resp.data)
                setIsSearched(true)
            })
            .catch( e => console.log(e))
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={10} lg={8} mx={"auto"}>
                <Paper sx={{padding: 2, margin: 'auto'}}>
                    <SearchForm categories={categories} onSubmitForm={searchButtonPressed}/>
                </Paper>
            </Grid>

            <Grid item xs={12} lg={10} mx={"auto"}>
                {items.length === 0 && !isSearched && <Typography variant={"body2"} marginTop={5} sx={{textAlign: 'center'}}>Search for all available items or try to narrow the results with the filters</Typography>}
                {isSearched && <Paper sx={{padding: 2, margin: 'auto',}}>
                    {items.length === 0 && isSearched && <Typography variant={"subtitle1"} sx={{fontWeight: 'bold', textAlign: 'center'}}>No result</Typography>}
                    {items.length > 0 && <Typography variant={"subtitle1"} marginX={2} sx={{fontWeight: 'bold'}}>Results:</Typography>}
                    <Grid container spacing={3} justifyContent={"space-around"} marginTop={2}>
                        {items.map( (item) => (
                            <Item key={item.id} id={item.id} image={`${itemService.imgHeader}${item.images}` || `not-found`} name={item.name}
                                  category={item.category} description={item.description}/>
                        ))}
                    </Grid>
                </Paper>}
            </Grid>
        </Grid>
    )
}