import {useFormik} from "formik";
import * as Yup from 'yup';
import authService from "../services/auth.service";
import {useEffect, useRef, useState} from "react";
import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    Grid, Link,
    makeStyles,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import AuthService from "../services/auth.service";
import {AccountCircle} from "@material-ui/icons";

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

const Register = () => {

    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [failure, setFailure] = useState(false)
    const timer = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

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

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            firstname: "",
            lastname: "",
            description: "",
            phone: "",
        },
        validationSchema,
        // validateOnBlur: false,
        // validateOnChange: false,
        onSubmit: (data) => {
            if (!loading) {
                setLoading(true)
                timer.current = window.setTimeout(() => {
                    setLoading(false)
                    let response = AuthService.register(
                        data.email, data.password)
                    response ? navigate("/login") : setFailure(true)
                }, 2000)
            }
        }
    })

    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <Paper elevation={2} className={classes.paper}>
                <Avatar className={classes.icon}>
                    <AccountCircle/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register new account
                </Typography>
                <Grid container component="form" onSubmit={formik.handleSubmit} noValidate>
                    <Grid container justifyContent="space-between" spacing={2}>
                        <Grid item xs >
                            <TextField
                                color="secondary"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                id="firstname"
                                label="Firstname"
                                name="firstname"
                                autoFocus
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                helperText={(formik.touched.firstname && formik.errors.firstname) || ' '}
                            />
                        </Grid>
                        <Grid item xs >
                            <TextField
                                color="secondary"
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                id="lastname"
                                label="Lastname"
                                name="lastname"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                helperText={(formik.touched.lastname && formik.errors.lastname) || ' '}
                            />
                        </Grid>
                    </Grid>
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
                    <Grid item xs={12} >
                        <TextField
                            color="secondary"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            name="confirmPassword"
                            label="Confirm password"
                            type="password"
                            id="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={(formik.touched.confirmPassword && formik.errors.confirmPassword) || ' '}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            color="secondary"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            placeholder="06301234567"
                            name="phone"
                            label="Phone number"
                            id="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={(formik.touched.phone && formik.errors.phone) || ' '}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            multiline={true}
                            rows={4}
                            name="description"
                            label="Description"
                            placeholder="A short introduction about yourself..."
                            id="description"
                            color="secondary"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={(formik.touched.description && formik.errors.description) || ' '}
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
            </Paper>
        </Container>
    );
}
export default Register