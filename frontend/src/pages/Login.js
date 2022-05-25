import {useContext, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import * as Yup from "yup";
import {Formik, Form} from "formik";
import {Link as RouterLink} from 'react-router-dom';
import {UserContext} from "../contexts/UserContext";
import {Avatar, Button, CircularProgress, Container, Grid, Link, Paper, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import FormTextField from "../components/FormTextField";
import CustomAlert from "../components/CustomAlert";

const Login = () => {

    const {login} = useContext(UserContext)
    const navigate = useNavigate()
    const {state} = useLocation();

    const initError = () => {
        let {error} = state ? state : {undefined}
        return error
    }

    const initSuccess = () => {
        let {success} = state ? state : {undefined}
        return success
    }

    const [error, setError] = useState(initError)
    const [success, SetSuccess] = useState(initSuccess)

    const initialValues = {
        username: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Add meg a felhasználóneved"),
        password: Yup.string()
            .required("Add meg a jelszavad"),
    })

    return (
        <Container maxWidth="md">
            <CustomAlert success={success} error={error}/>
            <Paper elevation={2} sx={{
                padding: 3,
                marginTop: 8,
                marginBottom: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{margin: 1, backgroundColor: 'primary.main'}}>
                    <AccountCircle/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Bejelentkezés
                </Typography>
                <Formik
                    initialValues={{...initialValues}}
                    validationSchema={validationSchema}
                    onSubmit={(values, {setSubmitting}) => {
                        login(values.username, values.password,
                            () => {
                                setSubmitting(false)
                                navigate("/home")
                            }, () => {
                                setSubmitting(false)
                                setError("Nem egyező felhasználónév és jelszó. Próbálja újra.")
                            })

                    }}
                >{({ values, errors, isValid, isSubmitting }) =>(
                    <Form>
                        <Grid container>
                            <Grid item xs={12} marginY={1}>
                                <FormTextField
                                    name="username"
                                    label="Felhasználónév"
                                    autoComplete="username"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} marginY={1}>
                                <FormTextField
                                    name="password"
                                    label="Jelszó"
                                    type="password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !isValid}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        marginTop: 2,
                                        marginBottom: 2,
                                    }}
                                >
                                    {isSubmitting ? <CircularProgress size={24}/> : 'Belépés'}
                                </Button>
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <Link color="secondary" component={RouterLink} to="/register" variant="body2">
                                        {"Még nincs fiókja? Regisztrációhoz kattintson ide"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
}
export default Login