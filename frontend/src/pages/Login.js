import {useContext, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import {Link as RouterLink} from 'react-router-dom';
import {UserContext} from "../contexts/UserContext";
import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    FormControlLabel,
    Grid, Link,
    Paper,
    Switch,
    Typography
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {AccountCircle} from "@mui/icons-material";
import FormTextField from "../components/FormTextField";

const Login = (props) => {

    const [loading, setLoading] = useState(false);
    const [failure, setFailure] = useState(false)
    const {currentUser, login} = useContext(UserContext)
    const navigate = useNavigate()
    const theme = useTheme()

    const initialValues = {
        email: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            // .email("Invalid email address")
            .required("Email address is required"),
        password: Yup.string()
            .required("Password is required"),
    })

    return (
        <Container maxWidth="md" sx={{marginTop: theme.spacing(5)}}>
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
                                values.email,
                                values.password,
                                () => {
                                    setLoading(false)
                                    navigate("/home")
                                }, () => {
                                    setLoading(false)
                                    setFailure(true)    //TODO failure message (snackbar mybe)
                                })
                        }
                    }}
                >
                    <Form>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormTextField
                                    name="email"
                                    label="Email"
                                    autoComplete="email"
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