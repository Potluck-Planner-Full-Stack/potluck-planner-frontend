import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import dateFormat from 'dateformat'

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

    useEffect(() => {
        axiosWithAuth()
        .get(`/api/potlucks/${id}`)
        .then(res => {
            console.log(res.data)
            setPotluck(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return(
        <div>
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
                <Row>
                    {potluck.items.length ? potluck.items.map(item => <Col>{item.item_name}</Col>) : <p>Loading...</p>}
                </Row>
                <Row>
                    {potluck.guests.length ? potluck.guests.map(guest => <Col>{guest.username}</Col>) : <p>Loading...</p>}
                </Row>
            </Container>
            
        </div>
    )
}

export default PotluckPage