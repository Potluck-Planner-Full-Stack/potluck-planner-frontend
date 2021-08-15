import { useEffect, useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'
import PotluckCard from './PotluckCard'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'

const Potlucks = () => {
    const [potlucks, setPotlucks] = useState([])
    const { push } = useHistory()

    useEffect(() => {
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
        <div>
            <h1>Potlucks</h1>
            {
                potlucks.map(potluck => <PotluckCard key={potluck.potluck_id} id={potluck.potluck_id} name={potluck.potluck_name} date={potluck.potluck_date} time={potluck.potluck_time} location={potluck.potluck_location} items={potluck.items} guests={potluck.guests}/>)
            }
            <Button variant="primary" className="button" onClick={handleCreate}>Create Potluck</Button>
        </div>
    )
}

export default Potlucks