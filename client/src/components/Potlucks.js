import { useEffect, useState } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'
import PotluckCard from './PotluckCard'

const Potlucks = () => {
    const [potlucks, setPotlucks] = useState([])

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

    return(
        <div>
            <h1>Hello world</h1>
            {
                potlucks.map(potluck => <PotluckCard key={potluck.potluck_id} name={potluck.potluck_name} date={potluck.potluck_date} time={potluck.potluck_time} location={potluck.potluck_location} items={potluck.items} guests={potluck.guests}/>)
            }
        </div>
    )
}

export default Potlucks