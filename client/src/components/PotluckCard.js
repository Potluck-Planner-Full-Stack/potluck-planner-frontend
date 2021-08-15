import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import dateFormat from 'dateformat'

const PotluckCard = (props) => {
    const { name, date, time, location, guests, items } = props
    console.log(items)
    return(
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                    Date: {dateFormat(date, "dddd, mmmm dS, yyyy")}
                    </Card.Text>
                    <Card.Text>
                    Time: {time}
                    </Card.Text>
                    <Card.Text>
                    Location: {location}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {
                        items.map(item => <ListGroupItem>{item.item_name}</ListGroupItem>)
                    }
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PotluckCard