import {Alert, Button, CardImg, Col, Container, Form, FormGroup, FormLabel, InputGroup, Row} from "react-bootstrap";
import {useState} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";

const required = (value) => {
    if (!value) {
        return (
            <Alert className="alert-danger" role="alert">
                This field is required!
            </Alert>
        );
    }
};

const Login = (props) => {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required"),
        password: Yup.string()
            .required("Password is required"),
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (data) => {
            console.log(JSON.stringify(data, null, 2))
            //handlelogin
        }
    })

    const handleLogin = (e) => {
        e.preventDefault();
        // setMessage("");
        // setLoading(true);
        //
        // AuthService.login(username, password).then(
        //     () => {
        //         props.history.push("/profile");
        //         window.location.reload();
        //     },
        //     (error) => {
        //         const resMessage =
        //             (error.response &&
        //                 error.response.data &&
        //                 error.response.data.message) ||
        //             error.message ||
        //             error.toString();
        //         setLoading(false);
        //         setMessage(resMessage);
        //     }
        // )

    };

    return (
        <Container fluid className="text-dark p-5">
            <Container className="bg-light p-5 border-dark">
                <Row className="justify-content-sm-center p-3">
                    <Col xs="3">
                        <CardImg variant="top"
                                 src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                                 alt="profile-img"
                                 className="profile-img-card"
                        />
                    </Col>
                </Row>
                <Form noValidate onSubmit={formik.handleSubmit}>
                    <Row className="justify-content-center">
                        <FormGroup as={Col} lg="4" className="mb-2">
                            <FormLabel htmlFor="username">Username</FormLabel>
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
                        </FormGroup>
                        <FormGroup as={Col} lg="4" className="mb-2">
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
                        </FormGroup>
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={8} className="d-grid m-4">
                            <Button size="lg" type="submit">Login</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </Container>
    )
}
export default Login