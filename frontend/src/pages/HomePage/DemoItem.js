import {Grid, Paper, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

const ImgStyled = styled('img')(({theme}) => ({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
}));

export default function DemoItem({image, name, category, description}) {

    return (
        <Grid item xs={12} md={6} xl={4}>
            <Paper>
                <Grid container>
                    <Grid item xs={4} padding={2}>
                        <ImgStyled alt="complex" src={`${image}`}/>
                    </Grid>
                    <Grid container item xs={8} padding={2}>
                        <Grid container flexDirection={"column"}>
                            <Typography variant={"subtitle1"} color="primary.main">{name}</Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                Category: {category}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}