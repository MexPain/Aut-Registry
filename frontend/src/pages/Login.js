import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import {
    Typography,
    Link,
    Container,
    Avatar,
    TextField,
    Button,
    Grid,
    Switch,
    FormControlLabel, Paper, makeStyles, CircularProgress
} from "@material-ui/core";
import {AccountCircle,} from "@material-ui/icons";
import { Link as RouterLink } from 'react-router-dom';
import {UserContext} from "../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        marginTop: 8,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        marginTop: theme.spacing(5)
    },
    icon: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
    },
    btn: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),

    }
}))

const Login = (props) => {

    const [loading, setLoading] = useState(false);
    const [failure, setFailure] = useState(false)
    const {currentUser, login} = useContext(UserContext)
    const navigate = useNavigate()


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            // .email("Invalid email address")
            .required("Email address is required"),
        password: Yup.string()
            .required("Password is required"),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        // validateOnBlur: false,
        // validateOnChange: false,
        onSubmit: (data) => {
            if (!loading) {
                setLoading(true)
                login(
                    data.email,
                    data.password,
                    ()=> {
                        setLoading(false)
                        navigate("/home")
                    }, ()=> {
                        setLoading(false)
                        setFailure(true)    //TODO failure message (snackbar mybe)
                    })
            }
        }
    })

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <Paper elevation={2} className={classes.paper}>
                <Avatar className={classes.icon}>
                    <AccountCircle/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Grid container component="form" onSubmit={formik.handleSubmit} noValidate>
                    <Grid item xs={12} >
                        <TextField
                            color="secondary"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={(formik.touched.email && formik.errors.email) || ' '}
                        />
                    </Grid>
                    <Grid item xs={12} >
                    <TextField
                        color="secondary"
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={(formik.touched.password && formik.errors.password) || ' '}
                    />
                    </Grid>
                    <Grid item >
                    <FormControlLabel
                        control={
                            <Switch
                                // checked={state.checkedB}
                                // onChange={handleChange}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me TODO"
                    />
                    </Grid>
                    <Grid item xs={12} >
                    <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                    >
                        {loading ? <CircularProgress size={24}/> : 'Sign In'}
                    </Button>
                    </Grid>
                    <Grid container>
                        <Grid item xs>
                            <Link color="secondary" href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link color="secondary" component={RouterLink} to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
export default Login