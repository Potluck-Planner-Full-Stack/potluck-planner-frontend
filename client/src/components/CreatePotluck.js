import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import axiosWithAuth from '../utils/axiosWithAuth'
import { useState } from 'react'

const initialFormValues = {
    potluck_name: '',
    potluck_date: '',
    potluck_time: '',
    potluck_location: ''
}

const CreatePotluck = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const { push } = useHistory()

    const handleChange = (e) => {
        e.preventDefault()
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .post('/api/potlucks', formValues)
        .then(res => {
            console.log(res.data.potluck_id)
            push(`/potluck-page/${res.data.potluck_id}`)
        })
        .catch(err => {
            console.log(err)
        })
        setFormValues(initialFormValues)
    }

    return(
        <div className="formContainer splash">
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail" value="potluck.potluck_name" onChange={handleChange}>
                        <Form.Label >Potluck Name</Form.Label>
                        <Form.Control placeholder="Enter potluck name" name="potluck_name"/>
                    </Form.Group>

                </Row>
                <Row>
                <Form.Group as={Col} controlId="formGridDate" value="potluck.potluck_date" onChange={handleChange}>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="potluck_date" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTime" value="potluck.potluck_time" onChange={handleChange}>
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" name="potluck_time"/>
                </Form.Group>

                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress2" value="potluck.potluck_location" onChange={handleChange}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control placeholder="Address" name="potluck_location"/>
                </Form.Group>

                <Button variant="primary" className="button" type="submit" onClick={handleSubmit}>
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default CreatePotluck