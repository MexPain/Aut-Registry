import wallpaper from "../../assets/electronics.png"
import {Box, Grid, Link, Paper, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import itemService from "../../services/item.service";
import DemoItem from "./DemoItem";
import {UserContext} from "../../contexts/UserContext";
import Item from "../../components/Item";
import {Link as RouterLink} from "react-router-dom";


const Home = () => {

    const [items, setItems] = useState([])
    const {currentUser} = useContext(UserContext)

    useEffect(() => {
        itemService.getRecentItems(4)
            .then( (resp) => {
                setItems([...resp.data])
            })
    }, []);

    return (<>
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 10,
                maxWidth: '1200px',
                marginX: 'auto',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${wallpaper})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={wallpaper} alt="" />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            pl: { xs: 2, md: 4 },
                            pt: { xs: 10 },
                            pb: { xs: 1},
                        }}
                    >
                        <Typography component="h1" variant="h4" color="inherit" gutterBottom>
                            Eszk??zt??r
                        </Typography>
                        <Typography variant="h6" color="inherit" paragraph>
                            Minden eszk??z egy helyen
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
        <Typography variant={"subtitle1"} fontWeight={"bold"} margin={1}>Legut??bbi bejegyz??sek:</Typography>
        { !currentUser && <Grid container spacing={3} justifyContent={"space-around"}>
            {items.map( (item) => (
                <DemoItem key={item.id} image={`${itemService.imgHeader}${item.images}` || `not-found`} name={item.name}
                      category={item.category} description={item.description}/>
            ))}
        </Grid>}
        { currentUser && <Grid container spacing={3} justifyContent={"space-around"}>
            {items.map( (item) => (
                <Item key={item.id} id={item.id} image={`${itemService.imgHeader}${item.images}` || `not-found`} name={item.name}
                      category={item.category} description={item.description}/>
            ))}
        </Grid>}
        { !currentUser &&
        <Typography variant={"body1"} marginX={2} marginTop={4}>
            <Link color="secondary" component={RouterLink} to={`/login`}>Jelentkezz be</Link> vagy {}
            <Link color="secondary" component={RouterLink} to={`/register`}>regisztr??lj</Link> {}
            hogy hozz??f??rhess adatb??zisunkhoz ??s megtal??ld amit keresel</Typography>}
    </>);
}
export default Home