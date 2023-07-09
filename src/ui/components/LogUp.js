import { useContext, useState } from "react"
import { useCookies } from "react-cookie"
import HookLogUp from "../../Hooks/LogUp"
import { UserContext } from "../../Hooks/UserContext"
export default function LogUp({ setOpen }) {

    let [error, setError] = useState()
    let [name, setName] = useState()
    let [email, setEmail] = useState()
    let [password, setPassword] = useState()

    let { setUser, setToken } = useContext(UserContext)
    return (
        <form action="" className="flex flex-col gap-3"
            onSubmit={async (e) => {
                e.preventDefault()
                HookLogUp(name, email, password, setError, setToken, setUser, setOpen)
            }}
        >
            {error?.message && <div className="text-red-600 font-[600]  uppercase bg-[#eeee] p-2 rounded-md">
                {error.message.split(',').map(e => <div> {e} </div>)}
            </div>}
            <div>
                <label htmlFor="" className="text-2xl font-[600] pt-2 pb-2  ">Full name</label>
                <input type="text" className="border-2 p-3 w-[100%]  text-2xl mt-2 mb-4 rounded-lg " value={name} onChange={e => setName(e.target.value)} />
                {error?.name && <p className="text-red-600 font-[600] p-1">{error.name}</p>}
            </div>
            <div>
                <label htmlFor="" className="text-2xl font-[600] pt-2 pb-2  ">Email</label>
                <input type="email" className="border-2 p-3 w-[100%]  text-2xl mt-2 mb-4 rounded-lg " value={email} onChange={e => setEmail(e.target.value)} />
                {error?.email && <p className="text-red-600 font-[600] p-1">{error.email}</p>}
            </div>
            <div className="mb-6">
                <label htmlFor="" className="text-2xl font-[600] pt-2 pb-2 ">Password</label>
                <input type="text" className="border-2 p-3 w-[100%]  text-2xl mt-2  rounded-lg" value={password} onChange={e => setPassword(e.target.value)} />
                {error?.password && <p className="text-red-600 font-[600] p-1">{error.password}</p>}
            </div>
            <div className="w-full  pt-4 pb-2">
                <button type="submit" className="p-4 w-full text-3xl font-[600] bg-black rounded-full text-white">Create Acount</button>
            </div>
        </form>)
}