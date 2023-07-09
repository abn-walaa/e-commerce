import axios from "axios"
import { useState, useEffect } from "react"

const GetAllOrders = (token, skip = 0, limit = 10) => {
    const [orders, setOrders] = useState(null)
    const [error, setError] = useState()
    useEffect(() => {
        axios.post('http://localhost:3001/order/', {}, {
            headers: {
                authorization: "Bearer " + token.token
            }
        }).then(e => setOrders(e.data)).catch(e => {
            console.log(e)
            setError(e)
        })
    }, [token])

    return { orders, error, setOrders }
}
export default GetAllOrders