import { useEffect } from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'

const Potlucks = () => {

    useEffect(() => {
        axiosWithAuth().get('/api/potlucks')
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return(
        <div>
            <h1>Hello world</h1>
        </div>
    )
}

export default Potlucks