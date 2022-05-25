import {Button, Grid, Paper, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import itemService from "../services/item.service";
import userService from "../services/user.service";
import CustomAlert from "../components/CustomAlert";

const ImgStyled = styled('img')(({theme}) => ({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '300px',
}));

export function ItemDetails() {
    const {id} = useParams()

    const [product, setProduct] = useState(undefined)

    const [error, setError] = useState(undefined)
    const [success, setSuccess] = useState(undefined)

    useEffect(() => {
        itemService.getItemById(id)
            .then(resp => {
                setProduct(resp.data)
            })
            .catch(e => console.log(e))
    }, []);

    const borrowItem = (id) => {
        userService.lendItemToUser(product.id)
            .then((resp) => {
                setSuccess(`Kölcsönzési kérélem elküldve`)
            })
            .catch((e) => {
                setError(e.response.data.message)
            })
    }

    return (
        <Grid container>
            <Grid item xs={12} marginY={4}>
                <CustomAlert success={success} error={error}/>
            </Grid>
            {product && <Grid item xs={12} lg={10} mx={"auto"}>
                <Paper sx={{padding: 2, margin: 'auto',}}>
                    <Grid container spacing={3}>
                        <Grid item xs={4} alignSelf={"center"}>
                            <ImgStyled alt="complex" src={`${itemService.imgHeader}${product.images}` || `not-found`}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Paper sx={{padding: 2, margin: 'auto',}}>
                                <Typography mb={2} variant={"h4"}>{product.name}</Typography>
                                <Typography mb={1} variant={"body1"}>Hozzáadva: {product.createdAt}</Typography>
                                <Typography mb={1} variant={"body1"}>Kategória: {product.category}</Typography>
                                <Typography mb={1} variant={"body1"}>Alkategória: {product.subCategory}</Typography>
                                <Typography mb={1} variant={"body1"}>Leírás: {product.description}</Typography>
                                <Button sx={{marginTop: 2}} variant={"contained"}
                                        onClick={() => borrowItem(product.id)}>Tárgy kikölcsönzése</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>}
        </Grid>
    )
}