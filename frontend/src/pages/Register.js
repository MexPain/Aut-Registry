import {Formik, Form} from "formik";
import * as Yup from 'yup';
import {useEffect, useRef, useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import AuthService from "../services/auth.service";
import {Avatar, Button, CircularProgress, Container, Grid, Link, Paper, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {AccountCircle} from "@mui/icons-material";
import FormTextField from "../components/FormTextField";


const Register = () => {

    const theme = useTheme()
    const [loading, setLoading] = useState(false);
    const [failure, setFailure] = useState(false)
    const navigate = useNavigate()


    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        description: "",
        phone: "",
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email address is required"),
        password: Yup.string()
            .required("Password is required")
            .min(5, "Must be at least 5 characters long"),
        confirmPassword: Yup.string()
            .required("This field is required")
            .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
        firstname: Yup.string()
            .required("Firstname is required"),
        lastname: Yup.string()
            .required("Lastname is required"),
        description: Yup.string()
            .max(300, "Must be a maximum of 300 characters"),
        phone: Yup.number()
            .integer()
            .typeError("Enter a valid phone number"),
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
                <Avatar sx={{
                    margin: theme.spacing(2),
                    backgroundColor: theme.palette.primary.main,
                }}>
                    <AccountCircle/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register new account
                </Typography>
                <Formik
                    initialValues={{...initialValues}}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        //add values to service, navigate to login if success
                        //show alert if fail
                    }}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormTextField
                                    label="Firstname"
                                    name="firstname"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    label="Lastname"
                                    name="lastname"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormTextField
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextField
                                    name="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextField
                                    name="confirmPassword"
                                    label="Confirm password"
                                    type="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextField
                                    placeholder="06301234567"
                                    name="phone"
                                    label="Phone number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextField
                                    multiline={true}
                                    rows={4}
                                    name="description"
                                    label="Description"
                                    placeholder="A short introduction about yourself..."
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
                                    {loading ? <CircularProgress size={24}/> : 'Register'}
                                </Button>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link color="secondary" component={RouterLink} to="/login" variant="body2">
                                        Already have an account? Sign in
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
export default Register