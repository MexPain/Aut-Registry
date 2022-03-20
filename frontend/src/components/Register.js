import {useFormik} from "formik";
import * as Yup from 'yup';
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";

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
            .oneOf([Yup.ref("password"), null], "Confirm Password does not match")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: (data) => {
            console.log(JSON.stringify(data, null, 2))
        }
    })

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
                                type="text"
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
                                type="text"
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
                <Button type="submit">Submit form</Button>
                <Button onClick={formik.handleReset} className="ms-5 btn-warning">Reset</Button>
            </Container>
        </Form>
    )
}
export default Register