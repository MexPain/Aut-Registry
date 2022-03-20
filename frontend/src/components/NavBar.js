import {useEffect, useState} from "react";
import {Container, Nav, Navbar, NavItem} from "react-bootstrap";
import {Link} from "react-router-dom";

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
                        <NavItem href="/home">
                            <Nav.Link as={Link} to="/home" className="text-white">Home</Nav.Link>
                        </NavItem>
                        <NavItem href="/about">
                            <Nav.Link as={Link} to="/about" className="text-white">About</Nav.Link>
                        </NavItem>
                    </Nav>
                    {currentUser ? (
                        <Nav>
                            <NavItem href="/profile">
                                <Nav.Link as={Link} to="/profile" className="text-white">{currentUser.username}</Nav.Link>
                            </NavItem>
                            <NavItem href="/login">
                                <Nav.Link as={Link} to="/login" className="text-white" onClick={logOut}>Log Out</Nav.Link>
                            </NavItem>
                        </Nav>
                    ) : (
                        <Nav>
                            <NavItem href="/register">
                                <Nav.Link as={Link} to="/register" className="text-white">Sign Up</Nav.Link>
                            </NavItem>
                            <NavItem href="/login">
                                <Nav.Link as={Link} to="/login" className="text-white">Sign In</Nav.Link>
                            </NavItem>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavBar