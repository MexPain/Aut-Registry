import {Box, Button, Grid, Link, Paper, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Link as RouterLink} from "react-router-dom"

const ImgStyled = styled('img')(({theme}) => ({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
}));

const Item = ({id, image, name, category, description}) => {

    return (
        <Grid item xs={12} md={6} xl={4}>
            <Paper>
                <Grid container>
                    <Grid item xs={4} padding={2}>
                        <ImgStyled alt="complex" src={`${image}`}/>
                    </Grid>
                    <Grid container item xs={8} padding={2}>
                        <Grid container flexDirection={"column"}>
                            <Box sx={{typography: "subtitle1"}}>
                                <Link color="secondary" component={RouterLink} to={`/items/${id}`}>
                                    {name}
                                </Link>
                            </Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Category: {category}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                            </Typography>
                        </Grid>
                        <Grid item alignSelf={"end"} container justifyContent={"end"} paddingX={1}>
                            <Button
                                variant="outlined"
                                size={"small"}
                                component={RouterLink} to={`/items/${id}`}
                            >Show more
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}
export default Item