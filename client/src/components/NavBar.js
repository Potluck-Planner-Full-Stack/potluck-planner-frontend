import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Route } from 'react-router-dom'
import SignIn from './SignIn'
import Register from './Register'
import Potlucks from './Potlucks'
import PotluckPage from './PotluckPage'
import CreatePotluck from './CreatePotluck'
import Home from './Home'

const NavBar = () => {
    const loggedIn = localStorage.getItem("token")

    const logout = () => {
        localStorage.removeItem("token")
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Potluck Planner</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            {loggedIn ? <></> : <Nav.Link href="/SignIn">Sign In</Nav.Link>}
                            {loggedIn ? <></> : <Nav.Link href="/Register">Register</Nav.Link>}
                            {loggedIn ? <Nav.Link href="/home" onClick={logout}>Logout</Nav.Link> : <></>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Route path="/home">
                <Home/>
            </Route>

            <Route path="/SignIn">
                <SignIn/>
            </Route>

            <Route path="/Register">
                <Register/>
            </Route>

            <Route path="/Potlucks">
                <Potlucks/>
            </Route>

            <Route path="/PotluckPage/:id">
                <PotluckPage/>
            </Route>

            <Route path="/create-potluck">
                <CreatePotluck/>
            </Route>

        </div>
    )
}

export default NavBar