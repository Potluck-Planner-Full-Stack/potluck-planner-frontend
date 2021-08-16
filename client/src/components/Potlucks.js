import { useEffect, useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'
import PotluckCard from './PotluckCard'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'

const Potlucks = () => {
    const [potlucks, setPotlucks] = useState([])
    const { push } = useHistory()
    const [user, setUser] = useState()

    useEffect(() => {
        setUser(localStorage.getItem("user"))
        axiosWithAuth().get('/api/potlucks')
        .then(res => {
            console.log(res.data)
            setPotlucks(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const handleCreate = () => {
        push('/create-potluck')
    }

    return(
        <div className="splash">
            <div>
                <h1>Potlucks</h1>
                <section className="potlucksContainer">
                    {
                        potlucks.map(potluck => <PotluckCard className="card" key={potluck.potluck_id} id={potluck.potluck_id} name={potluck.potluck_name} date={potluck.potluck_date} time={potluck.potluck_time} location={potluck.potluck_location} items={potluck.items} guests={potluck.guests}/>)
                    }
                </section>
                <Button variant="primary" className="button" onClick={handleCreate}>Create Potluck</Button>
            </div>
        </div>
    )
}

export default Potlucks