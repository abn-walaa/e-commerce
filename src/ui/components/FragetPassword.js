import axios from "axios";
import { useState } from "react";


export default function FargetPassword({ setLog }) {

    let [email, setEmail] = useState()
    let [password, setPassword] = useState()

    let [token, setToken] = useState()
    let [code, setCode] = useState()
    let [error, setError] = useState()
    let [reSend, setReSend] = useState()

    async function handleSendEmail() {
        axios.post('http://localhost:3001/log/forgotPassword', {
            email
        }).then(e => {
            setToken(e.data.token)
            setError()
        }
        ).catch(e => {
            setError(e)
        })
    }

    function handleChangePassword() {
        axios.patch('http://localhost:3001/log/forgotPassword', {
            code, password
        }, {
            headers: {
                authorization: "Bearer " + token
            }
        }).then(e => {
            setLog("in")
        }
        ).catch(e => {
            setError(e)
        })
    }
    return (<>
        {!token && <form action="" className="flex flex-col gap-3  "
            onSubmit={(e) => {
                e.preventDefault()
                handleSendEmail()
            }}>
            <div>
                <label htmlFor="" className="text-2xl font-[600] pt-2 pb-2  ">Email</label>

                {!error && <input required type="email" className="border-2 p-3 w-[100%]  text-2xl mt-2 mb-4 rounded-lg  " value={email} onChange={e => setEmail(e.target.value)} />}
                {error && <input required type="email" className="border-2 p-3 w-[100%]  text-2xl mt-2 mb-4 rounded-lg border-red-500 " value={email} onChange={e => setEmail(e.target.value)} />}
            </div>

            {error && <p className=" text-start text-lg text-red-600 font-[600] -mt-2">{error.response.data.errors.message}</p>}
            <div className="w-full  pt-4 pb-2">
                <button type="submit" className="p-4 w-full text-3xl font-[600] bg-black rounded-full text-white" >Send </button>
            </div>
        </form>}
        {token &&
            <form action="" className="flex flex-col gap-3  "
                onSubmit={(e) => {
                    e.preventDefault()
                    handleChangePassword()
                }}>
                <div>
                    {reSend &&
                        <div className="text-lg  font-bold">
                            Check your email !
                        </div>
                    }
                    <label htmlFor="" className="text-2xl font-[600] pt-2 pb-2  ">Code</label>

                    <input required type="text" className="border-2 p-3 w-[100%]  text-2xl mt-2 mb-4 rounded-lg  " value={code} onChange={e => setCode(e.target.value)} />
                    <label htmlFor="" className="text-2xl font-[600] pt-2 pb-2  ">Password</label>

                    <input required type="test" minLength={7} className="border-2 p-3 w-[100%]  text-2xl mt-2 mb-4 rounded-lg " value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                {error && <p className=" text-start text-lg text-red-600 font-[600] -mt-2">{error.response.data.errors.message}</p>}
                <div className="w-full  pt-4 pb-2">
                    <button type="submit" className="p-4 w-full text-3xl font-[600] bg-black rounded-full text-white" >Change </button>
                </div>
                <button type="button" onClick={e => {
                    handleSendEmail()
                    setReSend(true)
                }}>Resend the code ?</button>
            </form>}
    </>)
}