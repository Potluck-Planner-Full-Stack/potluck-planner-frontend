import Card from 'react-bootstrap/Card'
import dateFormat from 'dateformat'
import { useHistory } from 'react-router-dom'

const PotluckCard = (props) => {
    const { id, name, date, time, location } = props
    const { push } = useHistory()

    const moreInfo = () => {
        push(`/potluck-page/${id}`)
    }

    return(
        <div>
            <Card style={{ width: '18rem' }}>
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
                <Card.Body>
                    <Card.Link onClick={moreInfo}>More Info</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PotluckCard