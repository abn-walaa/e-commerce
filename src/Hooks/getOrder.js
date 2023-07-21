import { useState, useEffect } from "react";
import axios from "axios";

const GetOrder = (id, token) => {
    let [order, setOrder] = useState(null)
    let [error, setError] = useState(false)
    let [pedding, setPedding] = useState(true)
    console.log(token)
    useEffect(() => {
        let abortCont = new AbortController()
        axios.get('http://localhost:3001/order/' + id, {
            headers: {
                authorization: "Bearer " + token
            },
            signal: abortCont.signal
        }, {}).then(e => {
            setOrder(e.data)
            setPedding(false)
        }).catch(e => {
            setError(e)
            setPedding(false)
            console.log(e)
        })
        return () => abortCont.abort()
    }, [id])

    return { order, error, pedding }
}

export default GetOrder