import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import schema from '../validation/registerFormSchema'
import * as yup from 'yup'

// components //
import Form from 'react-bootstrap/Form'

// styling //
import Button from 'react-bootstrap/Button'


const initialFormValues = {
    username: '',
    password: ''
}

const initialFormErrorValues = {
    username: '',
    password: ''
}

const Register = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrorValues, setFormErrorValues] = useState(initialFormErrorValues)
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState(false)
    const { push } = useHistory()

    useEffect(() => {
        schema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])

    const validate = (name, value) => {
        yup.reach(schema, name)
            .validate(value)
            .then(() => setFormErrorValues({...formErrorValues, [name]:""}))
            .catch(err => setFormErrorValues({...formErrorValues, [name]:err.errors[0]}))
    }

    const handleChange = (e) => {
        e.preventDefault()
        validate(e.target.name,e.target.value)
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://ft-potluck-planner-backend.herokuapp.com/api/auth/register', formValues)
        .then(res => {
            console.log(res)
            push('/sign-in')
        })
        .catch(err => {
            console.log(err)
            setError(true)
        })
    }

    return(
        <div className="splash">
            <div className="formContainer">
                <Form className="form">
                    <Form.Group className="mb-3" controlId="formBasicusername" value={formValues.username} onChange={handleChange}>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" name="username"/>
                        {formErrorValues.username ? <Form.Text className="error">{formErrorValues.username}</Form.Text> : null}
                        {error ? <Form.Text className="error">Username already taken</Form.Text> : null}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" value={formValues.password} onChange={handleChange}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password"/>
                        {formErrorValues.password ? <Form.Text className="error">{formErrorValues.password}</Form.Text> : null}
                    </Form.Group>
                    <Form.Text className="text-muted">
                        <Link to='/sign-in'>
                            Already have an account?
                        </Link>
                    </Form.Text>
                    <Form.Group>
                        <Button variant="primary" disabled={disabled} className="button" type="submit" onClick={handleSubmit}>
                            Register
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Register
