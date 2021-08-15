import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'

const Home = () => {
    const { push } = useHistory()

    return (
        <div className="splash">
            <div className="homeContainer">
                <h1>POTLUCK PLANNER</h1>
                <section className="description">
                    <p>If you have ever tried to organize a potluck through text messages, online to-do lists or spreadsheets, you'll understand why this app is essential.</p>
                    <p>In the world of social gatherings and potlucks the "Potluck Planner" is king. This is your place for all things pot luck.</p>
                    <Button variant="primary" className="button" onClick={() => push('/Register')}>Start planning your potluck today! &#8594;</Button>
                </section>
            </div>
        </div>
    )
}

export default Home