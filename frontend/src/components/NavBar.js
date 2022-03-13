import {useEffect, useState} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

const NavBar = () => {
    const [showAdminBoard, setShowAdminBoard] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined)

    // useEffect(() => {
    //     if(){
    //         //get user from backend && show navbar with more options
    //         //if admin -> admin options (too)
    //     }
    // }, [])

    const logOut = () => {
        //TODO
    }

    return (
        <Navbar expand="lg" className="m-1 navbar-custom">
            <Container>
                <Navbar.Brand href="#home">
                <img
                    alt="Logo"
                    src="/public/logo192.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home" className="text-white">Home</Nav.Link>
                        <Nav.Link href="" className="text-white">About</Nav.Link>
                    </Nav>
                    {currentUser ? (
                        <Nav>
                            <Nav.Link href="/profile" className="text-white">{currentUser.username}</Nav.Link>
                            <Nav.Link href="/login" className="text-white" onClick={logOut}>
                                Log Out
                            </Nav.Link>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link href="/register" className="text-white">Sign Up</Nav.Link>
                            <Nav.Link href="/login" className="text-white">Sign In</Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavBar