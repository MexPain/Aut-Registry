import {Button, Grid, Paper, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import aut from "../assets/aut.png"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import itemService from "../services/item.service";
import userService from "../services/user.service";

const ImgStyled = styled('img')(({theme}) => ({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '300px',
}));

export function ItemDetails() {
    const {id} = useParams()

    const [product, setProduct] = useState(undefined)

    useEffect(() => {
        itemService.getItemById(id)
            .then(resp => {
                setProduct(resp.data)
            })
            .catch(e => console.log(e))
    }, []);

    const imgHeader = "http://localhost:8080/api"

    const borrowItem = (id) => {
        userService.lendItemToUser(product.id)
            .then((resp) => {
                alert(`Item ${id} successfully borrowed`)
                console.log(resp.data)
            })
            .catch((error) => {
                alert(JSON.stringify(error.response.data.message))
            })
    }

    return (
        <Grid container>
            {product && <Grid item xs={12} lg={10} mx={"auto"}>
                <Paper sx={{padding: 2, margin: 'auto',}}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <ImgStyled alt="complex" src={`${imgHeader}${product.images}` || `not-found`}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper sx={{padding: 2, margin: 'auto',}}>
                                <Typography mb={2} variant={"h4"}>{product.name}</Typography>
                                <Typography mb={1} variant={"body1"}>Registered at: {product.createdAt}</Typography>
                                <Typography mb={1} variant={"body1"}>Category: {product.category}</Typography>
                                <Typography mb={1} variant={"body1"}>Subcategory: {product.subCategory}</Typography>
                                <Typography mb={1} variant={"body1"}>Description: {product.description}</Typography>
                                <Button sx={{marginTop: 2}} variant={"contained"}
                                        onClick={() => borrowItem(product.id)}>Borrow this item</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>}
        </Grid>
    )
}