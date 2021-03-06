import dateFormat from 'dateformat'
import { useHistory } from 'react-router-dom'

// styling //
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


const PotluckCard = (props) => {
    const { id, name, date, time, location } = props
    const { push } = useHistory()

    return(
        <div>
            <Card style={{ width: '20rem' }}>
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
                    <Button variant="primary" className="button" type="submit" onClick={() => push(`/potluck-page/${id}`)}>More Info</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PotluckCard
