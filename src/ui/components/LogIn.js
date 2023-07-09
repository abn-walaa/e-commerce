import { useContext, useState } from "react"
import { UserContext } from "../../Hooks/UserContext"
import axios from "axios"
export default function LogIn({ setOpen }) {
    let [email, setEmail] = useState()
    let [password, setPassword] = useState()
    let { token, setToken, setUser } = useContext(UserContext)
    let [error, setError] = useState()
    function handleLogin() {
        axios.post('http://localhost:3001/log/login', {
            email,
            password

        }).then(e => {
            setToken("token", e.data.token, { path: "/" })
            setUser(e.data.user)
            setOpen(false)
        }).catch(e => {
            // setError(e)
            console.log(e)
        })
    }
    return (<form action="" className="flex flex-col gap-3  "
        onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
        }}>
        <div>
            <label htmlFor="" className="text-2xl font-[600] pt-2 pb-2  ">Email</label>
            <input type="email" className="border-2 p-3 w-[100%]  text-2xl mt-2 mb-4 rounded-lg " value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
            <label htmlFor="" className="text-2xl font-[600] pt-2 pb-2 ">Password</label>
            <input type="text" className="border-2 p-3 w-[100%]  text-2xl mt-2 mb-6 rounded-lg" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="w-full  pt-4 pb-2">
            <button type="submit" className="p-4 w-full text-3xl font-[600] bg-black rounded-full text-white" >LOG IN</button>
        </div>
    </form>)
}