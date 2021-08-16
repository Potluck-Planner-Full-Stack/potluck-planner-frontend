import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import dateFormat from 'dateformat'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const initialPotluck = {
    potluck_id: '',
    potluck_name: '',
    potluck_date: '',
    potluck_time: '',
    potluck_location: '',
    items: '',
    guests: ''
}

const PotluckPage = () => {
    const { id } = useParams()
    const [potluck, setPotluck] = useState(initialPotluck)
    const [isOrganizer, setIsOrganizer] = useState(false)
    const [item, setItem] = useState()
    const [guest, setGuest] = useState()
    const user = localStorage.getItem("user")
    const { push } = useHistory()

    useEffect(() => {
        axiosWithAuth()
        .get(`/api/potlucks/${id}`)
        .then(res => {
            setPotluck(res.data)
            console.log(res.data.guests)
            return res.data.guests
        }).then(res => {
            const organizer = res.filter(guest => {
                return guest.username === user
            })

            organizer[0].is_organizer === true ? setIsOrganizer(true) : setIsOrganizer(false)

        }).catch(err => {
            console.log(err)
        })
    }, [])

    const handleDelete = () => {
        axiosWithAuth()
        .delete(`/api/potlucks/${id}`)
        .then(res => {
            console.log(res)
            push('/potlucks')
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleChange = (e) => {
        e.preventDefault()
        setItem({
            [e.target.name]: e.target.value
        })
    }

    const handleItemSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .post(`/api/potlucks/${id}/items`, item)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleGuestSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .post(`/api/potlucks/${id}/guests`, guest)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <Container className="potluckWrapper">
            <Container>
                <Row>
                    {potluck.potluck_name}
                </Row>
                <Row>
                    Date: {dateFormat(potluck.potluck_date, "dddd, mmmm dS, yyyy")}
                </Row>
                <Row>
                    Time: {potluck.potluck_time}
                </Row>
                <Row>
                    Location: {potluck.potluck_location}
                </Row>
                <Row>Items:
                    {potluck.items.length ? potluck.items.map(item => <Row key={item.item_id}>{item.item_name}</Row>) : <p>Loading...</p>}
                </Row>
                <Row>Guests:
                    {potluck.guests.length ? potluck.guests.map(guest => <Row key={guest.user_id}>{guest.username}</Row>) : <p>Loading...</p>}
                </Row>
                    {isOrganizer ? 
                    <div>
                        <Row>
                            <Col>
                                {isOrganizer? <Button variant="primary" className="button" type="submit" onClick={() => push(`/edit-potluck/${id}`)}>
                                    Edit
                                </Button> : <></>}
                            </Col>
                            <Col>
                                {isOrganizer? <Button variant="primary" className="button" type="submit" onClick={handleDelete}>
                                    Delete
                                </Button> : <></>}
                            </Col>
                        </Row>
                        <Form className="form">
                            <Form.Group className="mb-3" controlId="formBasicItem" value={item} onChange={handleChange}>
                                <Form.Label>Add Item</Form.Label>
                                <Form.Control placeholder="Enter Item Name" name="item_name"/>
                            </Form.Group>
                            <Button variant="primary" className="button" type="submit" onClick={handleItemSubmit}>Add Item</Button>
                        </Form>
                        <Form className="form">
                            <Form.Group className="mb-3" controlId="formBasicItem" value={guest} onChange={handleChange}>
                                <Form.Label>Add Guest</Form.Label>
                                <Form.Control placeholder="Enter Guest's Username" name="username"/>
                            </Form.Group>
                            <Button variant="primary" className="button" type="submit" onClick={handleGuestSubmit}>Add Guest</Button>
                        </Form>
                    </div> : <></>}
            </Container>   
        </Container>
    )
}

export default PotluckPage