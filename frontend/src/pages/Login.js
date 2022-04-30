import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate, Routes, Route} from "react-router-dom";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import {Link as RouterLink} from 'react-router-dom';
import {UserContext} from "../contexts/UserContext";
import {
    Alert,
    Avatar,
    Button,
    CircularProgress, Collapse,
    Container,
    FormControlLabel,
    Grid, IconButton, Link,
    Paper,
    Switch,
    Typography
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {AccountCircle} from "@mui/icons-material";
import FormTextField from "../components/FormTextField";
import CloseIcon from '@mui/icons-material/Close';

const Login = ({error}) => {    //TODO navigation error messages

    const [loading, setLoading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false)
    const {currentUser, login} = useContext(UserContext)
    const navigate = useNavigate()
    const theme = useTheme()

    const initialValues = {
        username: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required"),
        password: Yup.string()
            .required("Password is required"),
    })

    const SessionAlert = () => {
        return (
            <Collapse in={alertOpen}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlertOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Close me!
                </Alert>
            </Collapse>
        )
    }

    useEffect(()=>{
        error && setAlertOpen(true)
    }, [error])

    return (
        <Container maxWidth="md" sx={{marginTop: theme.spacing(5)}}>
            {/*<Routes>*/}
            {/*    <Route path="expired" element={<SessionAlert />}/>*/}
            {/*</Routes>*/}
            {alertOpen && <SessionAlert />}
            <Paper elevation={2} sx={{
                padding: theme.spacing(3),
                marginTop: 8,
                marginBottom: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{margin: theme.spacing(2), backgroundColor: theme.palette.primary.main}}>
                    <AccountCircle/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={{...initialValues}}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        if (!loading) {
                            setLoading(true)
                            login(
                                values.username,
                                values.password,
                                () => {
                                    setLoading(false)
                                    navigate("/home")
                                }, () => {
                                    setLoading(false)
                                    //setError("Wrong credentials. Please try again.")
                                })
                        }
                    }}
                >
                    <Form>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormTextField
                                    name="username"
                                    label="Username"
                                    autoComplete="username"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextField
                                    name="password"
                                    label="Password"
                                    type="password"
                                />
                            </Grid>
                            <Grid item>
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
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        marginTop: theme.spacing(2),
                                        marginBottom: theme.spacing(2),
                                    }}
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
                    </Form>
                </Formik>
            </Paper>
        </Container>
    );
}
export default Login