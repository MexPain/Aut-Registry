import {Formik, Form} from "formik";
import * as Yup from 'yup';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import AuthService from "../services/auth.service";
import {Avatar, Button, CircularProgress, Container, Grid, Link, Paper, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import FormTextField from "../components/FormTextField";
import {FileUploader} from "../components/fileUpload/FileUploader";
import {useEffect, useState} from "react";
import CustomAlert from "../components/CustomAlert";


const Register = () => {

    const navigate = useNavigate()

    const [error, setError] = useState(undefined)

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
            .email("Érvénytelen email cím")
            .required("Adja meg az email címét"),
        password: Yup.string()
            .required("Adjon meg egy jelszót")
            .min(5, "A jelszó legalább 5 karakter hosszú legyen"),
        confirmPassword: Yup.string()
            .required("Ez a mező kötelező")
            .oneOf([Yup.ref("password"), null], "A két beírt jelszó nem egyezik"),
        description: Yup.string()
            .max(300, "Maximum 300 karakter"),
        phone: Yup.number()
            .integer()
            .typeError("Érvénytelen telefonszám"),
        username: Yup.string()
            .required("Adjon meg egy felhasználónevet"),
        images: Yup.array(
            // Yup.object({     //render errors
            //     url: Yup.string().required("Object required"),
            // })
        ).max(1, "Csak 1 fájl feltöltése engedélyezett"),
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [error])

    return (
        <Container maxWidth="md" sx={{marginTop: 5}}>
            <CustomAlert error={error}/>
            <Paper elevation={2} sx={{
                padding: 3,
                marginBottom: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar sx={{
                    margin: 1,
                    backgroundColor: 'primary.main',
                }}>
                    <AccountCircle/>
                </Avatar>
                <Typography component="h1" variant="h5" marginBottom={2}>
                    Új fiók regisztrálása
                </Typography>
                <Formik
                    initialValues={{...initialValues}}
                    validationSchema={validationSchema}
                    validateOnBlur={true}
                    validateOnChange={false}
                    onSubmit={(values, {setSubmitting}) => {
                        AuthService.register(
                            values.username, values.email, values.password,
                            values.description, values.phone,
                            values.images.length > 0 ? values.images[0].url : null,
                            values.firstname, values.lastname
                        ).then(
                            (success) => {
                                navigate("/login", {state: {success: "Sikeres regisztráció. Most már bejelentkezhet"}})
                            })
                            .catch((error) => {
                                let message = error.response.data.message || "Registráció meghiúsult. Próbálja újra"
                                setError(message)
                                setSubmitting(false)
                            })
                    }}
                >{({values, errors, isValid, isSubmitting}) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={6} marginY={1}>
                                <FormTextField
                                    label="Vezetéknév"
                                    name="lastname"
                                />
                            </Grid>
                            <Grid item xs={6} marginY={1}>
                                <FormTextField
                                    label="Keresztnév"
                                    name="firstname"
                                />
                            </Grid>

                            <Grid item xs={6} marginY={1}>
                                <FormTextField
                                    name="password"
                                    label="Jelszó*"
                                    type="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={6} marginY={1}>
                                <FormTextField
                                    name="confirmPassword"
                                    label="Jelszó megerősítése*"
                                    type="password"
                                />
                            </Grid>
                            <Grid item xs={12} marginY={1}>
                                <FormTextField
                                    label="Felhasználónév*"
                                    name="username"
                                    placeholder="A fiók neveként jelenik meg. Egyedinek kell lennie"
                                />
                            </Grid>
                            <Grid item xs={12} marginY={1}>
                                <FormTextField
                                    label="Email*"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12} marginY={1}>
                                <FormTextField
                                    placeholder="06301234567"
                                    name="phone"
                                    label="Telefonszám"
                                />
                            </Grid>
                            <Grid item xs={12} marginY={1}>
                                <FormTextField
                                    multiline={true}
                                    rows={4}
                                    name="description"
                                    label="Bemutatkozás"
                                    placeholder="Egy rövid leírás magadról..."
                                />
                            </Grid>

                            <Typography marginLeft={2} marginTop={2} variant="subtitle1">Profilkép feltöltése</Typography>
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
                                        marginTop: 2,
                                    }}
                                >
                                    {isSubmitting ? <CircularProgress size={24}/> : 'Regisztrálok'}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="caption">A *-al jelölt mezőket kötelező megadni</Typography>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link color="secondary" component={RouterLink} to="/login" variant="body2">
                                        Már van fiókom
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