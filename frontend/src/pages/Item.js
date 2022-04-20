import {ButtonBase, Grid, makeStyles, Paper, Typography} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    image: {
        width: 128,
        height: 128,
        marginRight: theme.spacing(2)
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    paper: {
        marginBottom: theme.spacing(2)
    },
}))

const Item = (props) => {

    const {image, name, category, description} = props
    const classes = useStyles()

    const handleClick = () => {
        console.log(`Ez az ${name} nevű item`)
    }

    return (
        <Grid container item xs={12} md={5} component={Paper} className={classes.paper} onClick={handleClick}>
            <Grid item>
                <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={`/images/${image}.png`}/>
                </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
                <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                        {name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Category: {category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                    </Typography>
                </Grid>

            </Grid>
        </Grid>
    )
}
export default Item