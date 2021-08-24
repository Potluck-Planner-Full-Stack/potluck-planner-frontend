import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'

// components //
import SignIn from './SignIn'
import Register from './Register'
import Potlucks from './Potlucks'
import PotluckPage from './PotluckPage'
import CreatePotluck from './CreatePotluck'
import Home from './Home'
import EditPotluck from './EditPotluck'

// styling //
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        setLoggedIn(localStorage.getItem("token"))
    },[])

    const logout = () => {
        localStorage.removeItem("token")
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Potluck Planner</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {loggedIn ? <></> : <Nav.Link href="/">Home</Nav.Link>}
                            {loggedIn ? <></> : <Nav.Link href="/sign-in">Sign In</Nav.Link>}
                            {loggedIn ? <></> : <Nav.Link href="/register">Register</Nav.Link>}
                            {loggedIn ? <Nav.Link href="/potlucks">Potlucks</Nav.Link> : <></>}
                            {loggedIn ? <Nav.Link href="/" onClick={logout}>Logout</Nav.Link> : <></>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Route path="/sign-in">
                <SignIn setLoggedIn={setLoggedIn}/>
            </Route>

            <Route path="/register">
                <Register/>
            </Route>

            <Route path="/potlucks">
                <Potlucks/>
            </Route>

            <Route path="/potluck-page/:id">
                <PotluckPage/>
            </Route>

            <Route path="/create-potluck">
                <CreatePotluck/>
            </Route>

            <Route path="/edit-potluck/:id">
                <EditPotluck/>
            </Route>

            <Route exact path="/">
                <Home/>
            </Route>

        </div>
    )
}

export default NavBar
