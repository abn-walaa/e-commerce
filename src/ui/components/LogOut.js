import axios from "axios";
import { useCookies } from "react-cookie";
import { UserContext } from "../../Hooks/UserContext";
import { useContext } from "react";
export default function LogOut({ setOpen }) {

    const { user, setUser, setToken, token, removeToken } = useContext(UserContext)
    async function logOut() {
        axios.delete('http://localhost:3001/log/logout', {
            headers: {
                authorization: "Bearer " + token.token
            }
        }).then(e => {
            setUser(null)
            setOpen(e => !e)
            removeToken('token')
        }).catch(e => console.log(e))
    }
    return (
        <>
            <>

                <span className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-20" onClick={() => setOpen(e => !e)}></span>
                <div className="rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 bg-white absolute z-30">
                    <p className="text-4xl p-2 font-[600] ">ARE YOU SURE ?</p>
                    <div className="flex justify-between p-5">
                        <button className="p-2 text-2xl bg-black text-white pl-5 pr-5 rounded-md " onClick={logOut}>Yes</button>
                        <button className="p-2 text-2xl bg-black text-white pl-5 pr-5 rounded-md " onClick={() => setOpen(e => !e)}>No</button>
                    </div>
                </div>
            </>
        </>
    )
}