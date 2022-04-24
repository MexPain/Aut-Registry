import {Formik, Form} from "formik";
import * as Yup from 'yup';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import AuthService from "../services/auth.service";
import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    Grid,
    Link,
    Paper,
    Typography
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {AccountCircle} from "@mui/icons-material";
import FormTextField from "../components/FormTextField";
import {FileUploader} from "../components/fileUpload/FileUploader";


const Register = () => {

    const theme = useTheme()

    const navigate = useNavigate()

    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        lastname: "",
        description: "",
        phone: "",
        images: [],
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
        description: Yup.string()
            .max(300, "Must not exceed 300 characters"),
        phone: Yup.number()
            .integer()
            .typeError("Enter a valid phone number"),
        username: Yup.string()
            .required("Username is required"),
        images: Yup.array(
            // Yup.object({     //render errors
            //     url: Yup.string().required("Object required"),
            // })
        ).max(1, "You can only upload 1 file"),
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
                    validateOnBlur={true}
                    validateOnChange={false}
                    onSubmit={(values, { setSubmitting } )=> {
                        console.log(values.images)
                        AuthService.register(
                            values.username,
                            values.email,
                            values.password,
                            values.description,
                            values.phone,
                            values.images.length > 0 ? values.images[0].url : null,
                            values.firstname,
                            values.lastname
                            ).then(
                            (success) => {
                                navigate("/login")
                            },
                            (error) => {
                                console.log(error)
                                setSubmitting(false)
                            }
                        )
                        //add values to service, navigate to login if success
                        //show alert if fail
                        console.log(values)
                        //setSubmitting(false)
                    }}
                >{({ values, errors, isValid, isSubmitting }) =>(
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

                            <Grid item xs={6}>
                                <FormTextField
                                    name="password"
                                    label="Password*"
                                    type="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormTextField
                                    name="confirmPassword"
                                    label="Confirm password*"
                                    type="password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextField
                                    label="Username*"
                                    name="username"
                                    placeholder="Displays as the name of your account. Must be unique."
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextField
                                    label="Email*"
                                    name="email"
                                    autoComplete="email"
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

                            <Typography marginLeft={2} marginTop={2} variant="subtitle1">Upload profile
                                picture</Typography>
                            <Grid container item>
                                <FileUploader name="images"/>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        marginTop: theme.spacing(2),
                                    }}
                                >
                                    {isSubmitting ? <CircularProgress size={24}/> : 'Register'}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="caption">Fields marked with * are mandatory</Typography>
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
                    )}
                </Formik>
            </Paper>
        </Container>
    );
}
export default Register