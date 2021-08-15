import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
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
                    {potluck.items.length ? potluck.items.map(item => <Row>{item.item_name}</Row>) : <p>Loading...</p>}
                </Row>
                <Row>Guests:
                    {potluck.guests.length ? potluck.guests.map(guest => <Row>{guest.username}</Row>) : <p>Loading...</p>}
                </Row>
            </Container>   
        </Container>
    )
}

export default PotluckPage