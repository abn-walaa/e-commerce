import { useState } from "react"
import axios from "axios"
export default function Order({ products, setProducts, totle, user, token, setOrder }) {
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [error, setError] = useState()
    console.log(error)
    async function newOrder() {
        axios.post('http://localhost:3001/order/new', {

            name, address, products, phoneNumber
        }, {
            headers: {
                authorization: "Bearer " + token.token
            },
        }).then(e => {
            localStorage.removeItem('Cart')
            setProducts()
            setOrder(e.data._id)
        }).catch(e => setError(e.response.data))

    }
    return (
        <>
            {products && <>
                <form action="" className="p-4">
                    <div className="text-4xl font-[600] p-2  pb-4">Information</div>
                    <div className="p-4">
                        <div className="mb-6">
                            <label htmlFor="" className="text-2xl font-[600] pt-2 pb-2 " >Name</label>
                            <input type="text" className="border-2 p-3 w-[100%]  text-2xl mt-2  rounded-lg" value={name} onChange={(e) => setName(e.target.value)} placeholder="Mohammed ..." />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="" className="text-2xl font-[600] pt-2 pb-2 ">Address</label>
                            <input type="text" className="border-2 p-3 w-[100%]  text-2xl mt-2  rounded-lg" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Iraq - bagdad" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="" className="text-2xl font-[600] pt-2 pb-2 ">Phone number</label>
                            <input type="tel" className="border-2 p-3 w-[100%]  text-2xl mt-2  rounded-lg" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder=" 07822246420" />
                        </div>
                    </div>
                </form>
                <div className="p-5 border-2  flex flex-col rounded-md  justify-between">
                    <div>
                        {products.map(item => {
                            return (<div>
                                <div className="text-xl font-[600] flex flex-row justify-between p-2   "><div>
                                    <span className="pr-1">{item.howMach} </span><span className="w-20 overflow-ellipsis pr-2">{item.product.title}</span>
                                </div>
                                    <span className="text-xl text-green-700 "> {item.product.price * item.howMach}<span className="text-sm">$</span> </span>
                                </div>
                            </div>)
                        })}
                    </div>
                    <div className="w-full  pt-4 pb-2 mt-auto">
                        <div className="mt-auto mb-4 text-lg font-[700]  ">
                            Totel: <span className="text-green-600">{totle}<span className="text-sm">$</span></span>
                        </div>
                        <button type="submit" className="p-4 w-full text-3xl font-[600] bg-black rounded-full text-white" onClick={newOrder}>Order</button>
                    </div>
                </div>
                {error &&
                    <>
                        <span className="fixed bg-black z-30 top-0 left-0 w-full h-full opacity-25" onClick={() => setError()}></span>
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-[600] p-5 rounded-md bg-red-600 text-white  z-40 text-center">
                            {error.errors.message.split(',').map(e => <p>{e}</p>)}
                        </div></>
                }</>}
        </>
    )
}