import axios from "axios"
import { useContext } from "react"

export default async function HookLogUp(name, email, password, setError, setCookie, setUser, setOpen) {
    try {

        let data = await axios.post('http://localhost:3001/log/logup', {
            name, email, password,
        }).then(e => e.data).catch(e => setError(e.response.data.errors))

        setCookie("token", data.token, { path: "/" })
        setUser(data.user)
        setOpen(e => !e)

    } catch (error) {

        setError(error)
    }
}