import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'
import dateFormat from 'dateformat'

// Styling //
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Accordion from 'react-bootstrap/Accordion'

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
    const [item, setItem] = useState({item_name: ''})
    const [guest, setGuest] = useState({username: ''})
    const [update, setUpdate] = useState(false)
    const [error, setError] = useState(false)
    const [itemError, setItemError] = useState(false)
    const user = localStorage.getItem("user")
    const { push } = useHistory()

    useEffect(() => {
        axiosWithAuth()
        .get(`/api/potlucks/${id}`)
        .then(res => {
            setPotluck(res.data)
            setError(false)
            return res.data.guests
        }).then(res => {
            const organizer = res.filter(guest => {
                return guest.username === user
            })

            organizer[0].is_organizer === true ? setIsOrganizer(true) : setIsOrganizer(false)

        }).catch(err => {
            console.log(err)
        })
    }, [update])

    const handleDeletePotluck = () => {
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

    const handleItemChange = (e) => {
        e.preventDefault()
        setItem({
            [e.target.name]: e.target.value
        })
    }

    const handleGuestChange = (e) => {
        e.preventDefault()
        setGuest({
            [e.target.name]: e.target.value
        })
    }

    const handleItemSubmit = (e) => {
        e.preventDefault()
        if(item.item_name && item.item_name.length !== 0){
            axiosWithAuth()
            .post(`/api/potlucks/${id}/items`, item)
            .then(res => {
                console.log(res)
                setUpdate(true)
                setUpdate(false)
                setItemError(false)
            })
            .catch(err => {
                console.log(err)
            })
            setItem({item_name: ''})
        } else {
            setItemError(true)
        }
    }

    const handleGuestSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .post(`/api/potlucks/${id}/guests`, guest)
        .then(res => {
            console.log(res)
            setUpdate(true)
            setUpdate(false)
        })
        .catch(err => {
            console.log(err)
            setError(true)
        })
        setGuest({username: ''})
    }
    
    const handleBring = (id) => {
        console.log(id)
        axiosWithAuth()
        .put(`/api/potlucks/items/${id}`, {select_item: true})
        .then(res => {
            console.log(res)
            setUpdate(true)
            setUpdate(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleItemDelete = (id) => {
        console.log(id)
        axiosWithAuth()
        .delete(`api/potlucks/items/${id}`)
        .then(res => {
            console.log(res)
            setUpdate(true)
            setUpdate(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleRSVP = () => {
        axiosWithAuth()
        .put(`api/potlucks/${id}/guests`)
        .then(res => {
            console.log(res)
            setUpdate(true)
            setUpdate(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="splash">
            <Container className="potluckWrapper">
                <Card style={{ width: 'fluid' }}>
                    <Card.Body>
                        <Card.Title>{potluck.potluck_name}</Card.Title>
                        <Card.Text>
                            Date: {dateFormat(potluck.potluck_date, "dddd, mmmm dS, yyyy")}
                        </Card.Text>
                        <Card.Text>
                            Time: {potluck.potluck_time}
                        </Card.Text>
                        <Card.Text>
                            Location: {potluck.potluck_location}
                        </Card.Text>
                    </Card.Body>

                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Items</Accordion.Header>
                            <Accordion.Body>
                                {potluck.items.length && potluck.items[0].item_id != null ? potluck.items.map(item => <ListGroupItem className="items" key={item.item_id}>{item.item_name} {item.user_id ? <></> : <Button variant="primary" className="button" type="submit" onClick={() => handleBring(item.item_id)}>Bring</Button>} {isOrganizer? <Button variant="primary" className="button" type="submit" onClick={() => handleItemDelete(item.item_id)}>
                            Delete
                            </Button> : <></>
                        }</ListGroupItem>) : null}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Guests</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup className="list-group-flush">
                                    {potluck.guests.length ? potluck.guests.map(guest => <ListGroupItem key={guest.user_id} className='guests'>{guest.username} {guest.is_going? <p>Is Going</p> : null} {user === guest.username && guest.is_going === false ? <Button variant="primary" className="button" type="submit" onClick={handleRSVP}>RSVP</Button> : null}</ListGroupItem>) : <p>Loading...</p>}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    
                    <Card.Body className="cardButtons">
                        {isOrganizer? <Button variant="primary" className="button" type="submit" onClick={() => push(`/edit-potluck/${id}`)}>
                            Edit
                            </Button> : <></>
                        }
                        {isOrganizer? <Button variant="primary" className="button" type="submit" onClick={handleDeletePotluck}>
                            Delete
                            </Button> : <></>
                        }
                    </Card.Body>
                </Card>
                <Container className="addItemGuest">
                        {isOrganizer ? 
                        <div>
                            <Form className="form">
                                <Form.Group className="mb-3" controlId="formBasicItem" value={item} onChange={handleItemChange}>
                                    <Form.Label>Add Item</Form.Label>
                                    <Form.Control placeholder="Enter Item Name" name="item_name" value={item.item_name}/>
                                    {itemError ? <Form.Text className="error">Item name required</Form.Text> : null}
                                </Form.Group>
                                <Button variant="primary" className="button" type="submit" onClick={handleItemSubmit}>Add Item</Button>
                            </Form>
                            <Form className="form">
                                <Form.Group className="mb-3" controlId="formBasicItem" value={guest} onChange={handleGuestChange}>
                                    <Form.Label>Add Guest</Form.Label>
                                    <Form.Control placeholder="Enter Guest's Username" name="username" value={guest.username}/>
                                    {error ? <Form.Text className="error">User not found</Form.Text> : null}
                                </Form.Group>
                                <Button variant="primary" className="button" type="submit" onClick={handleGuestSubmit}>Add Guest</Button>
                            </Form>
                        </div> : <></>}
                </Container>   
            </Container>
        </div>
    )
}

export default PotluckPage