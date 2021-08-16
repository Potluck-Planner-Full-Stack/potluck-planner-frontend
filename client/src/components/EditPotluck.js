import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useHistory, useParams } from 'react-router-dom'
import axiosWithAuth from '../utils/axiosWithAuth'
import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'

const initialFormValues = {
    potluck_name: '',
    potluck_date: '',
    potluck_time: '',
    potluck_location: '',
    // items: '',
    // guests: ''
}

const EditPotluck = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const { id } = useParams()
    const { push } = useHistory()

    useEffect(() => {
        axiosWithAuth()
        .get(`/api/potlucks/${id}`)
        .then(res => {
            setFormValues({
                potluck_name: res.data.potluck_name,
                potluck_date: res.data.potluck_date,
                potluck_time: res.data.potluck_time,
                potluck_location: res.data.potluck_location
            })
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

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
        .put(`/api/potlucks/${id}`, formValues)
        .then(res => {
            console.log(res)
            push(`/potluck-page/${id}`)
        })
        .catch(err => {
            console.log(err)
        })
    }
    console.log(formValues)

    const date = (dateFormat(formValues.potluck_date, "yyyy-mm-dd"))

    return(
        <div className="formContainer">
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail" value={formValues.potluck_name} onChange={handleChange}>
                        <Form.Label>Potluck Name</Form.Label>
                        <Form.Control name="potluck_name" value={formValues.potluck_name}/>
                    </Form.Group>

                </Row>
                <Row>
                <Form.Group as={Col} controlId="formGridDate" value={date} onChange={handleChange}>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="potluck_date" value={date}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridTime" value={formValues.potluck_time} onChange={handleChange}>
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="time" name="potluck_time" value={formValues.potluck_time}/>
                </Form.Group>

                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress2" value={formValues.potluck_location} onChange={handleChange}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control placeholder="Address" name="potluck_location" value={formValues.potluck_location}/>
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formGridAddress2" value={formValues.items} onChange={handleChange}>
                    <Form.Label>Add Items</Form.Label>
                    <Form.Control placeholder="Add Item" name="items"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2" value={formValues.guests} onChange={handleChange}>
                    <Form.Label>Add Guests</Form.Label>
                    <Form.Control placeholder="Add Guest" name="guests"/>
                </Form.Group> */}

                <Button variant="primary" className="button" type="submit" onClick={handleSubmit}>
                    Submit Changes
                </Button>
            </Form>
        </div>
    )
}

export default EditPotluck