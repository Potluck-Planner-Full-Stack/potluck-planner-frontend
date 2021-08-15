import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const initialFormValues = {
    username: '',
    password: ''
}

const Register = () => {
    const [formValues, setFormValues] = useState(initialFormValues)

    const handleChange = (e) => {
        e.preventDefault()
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://ft-potluck-planner-backend.herokuapp.com/api/auth/register', formValues)
        .then(res => console.log(res))
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="splash">
            <div className="formContainer">
                <Form className="form">
                    <Form.Group className="mb-3" controlId="formBasicusername" value={formValues.username} onChange={handleChange}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" name="username"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" value={formValues.password} onChange={handleChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password"/>
                        <Form.Text className="text-muted">
                            <Link to='/sign-in'>
                                Already have an account?
                            </Link>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" className="button" type="submit" onClick={handleSubmit}>
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Register