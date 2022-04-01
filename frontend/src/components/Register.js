import {useFormik} from "formik";
import * as Yup from 'yup';
import {Alert, Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import authService from "../services/auth.service";
import {useState} from "react";

const Register = () => {

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required")
            .min(6, "Username must be at least 6 characters")
            .max(30, "Username must not exceed 30 characters"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(40, "Password must not exceed 40 characters"),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
        firstname: Yup.string()
            .required("Firstname is required"),
        lastname: Yup.string()
            .required("Lastname is required"),
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
            firstname: "",
            lastname: "",
        },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: true,
        onSubmit: (data) => {
            const {username, password, firstname, lastname} = data
            authService.register(username, password, firstname, lastname).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                    setSuccessful(false);
                }
            )
        }
    })

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    return (
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Container className="mb-2">
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.username}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationFormikPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationFormikConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="password"
                                placeholder="Password again"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.confirmPassword}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationFormikFirstname">
                        <Form.Label>Firstname</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="Your first name"
                                name="firstname"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.firstname}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.firstname}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationFormikLastname">
                        <Form.Label>Lastname</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="Your last name"
                                name="lastname"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                isInvalid={!!formik.errors.lastname}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.lastname}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Button type="submit">Submit form</Button>
                <Button onClick={formik.handleReset} className="ms-5 btn-warning">Reset</Button>
                {message && (
                    <Row className="my-3">
                        <Form.Group>
                            <Alert variant={successful ? "success" : "danger"}>{message}</Alert>
                        </Form.Group>
                    </Row>
                )}
            </Container>
        </Form>
    )
}
export default Register