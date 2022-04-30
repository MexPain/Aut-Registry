import {Box, ButtonBase, Grid, Link, Paper, Typography} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
import {Link as RouterLink} from "react-router-dom"

const ImgStyled = styled('img')(({theme}) => ({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
}));

const Item = (props) => {
    const theme = useTheme()
    const {image, name, category, description} = props


    return (
        <Grid container flexShrink={0} item xs={12} md={5} justifyContent="center" component={Paper} sx={{marginBottom: theme.spacing(2)}}>
            <Grid item paddingBottom={theme.spacing(2)}>
                <ButtonBase sx={{width: 128, height: 128, marginRight: theme.spacing(2)}}>
                    <ImgStyled alt="complex" src={`/images/${image}.png`}/>
                </ButtonBase>
            </Grid>
            <Grid item xs={12} sm>
                <Box sx={{typography: "subtitle1"}}>
                    <Link color="secondary" component={RouterLink} to="">
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
        </Grid>
    )
}
export default Item