import { useLocation } from "react-router-dom"
import getOrder from "../../Hooks/getOrder"
import { useContext, useEffect } from "react"
import { UserContext } from "../../Hooks/UserContext"
import Card from "../components/Card"
import { Link } from "react-router-dom"
import { Loading } from "../components/Loading"
export default function Order() {
    let id = useLocation().pathname.split('order/')[1]
    let { user, token } = useContext(UserContext)
    const { order, error, pedding } = getOrder(id, token.token)

    return (

        <div className="container max-w-[1600px] m-auto bg-white p-2 mt-10 rounded-md">
            {pedding &&
                <div className="flex justify-center items-center">
                    <Loading></Loading>
                </div>
            }
            {!pedding && !order &&
                <>
                    <div className="w-full h-[50vh] flex justify-center items-center flex-col gap-5">
                        <p className="text-2xl font-[600] opacity-100">There is no Order with this id </p>
                        <Link to={"/"} className="opacity-60 p-2 bg-black rounded-lg text-white">Home</Link>
                    </div>
                </>
            }
            {!pedding && order && <>

                <div className="text-2xl font-[600] p-5 flex  flex-col justify-between gap-5"><span>Order#{order?._id}</span> <span>Status : {order.status}</span><span>Totel : <span className=" text-green-800">{order.Totel}<span className="text-lg">$</span> </span> </span></div>
                <div className=" flex flex-row gap-5 flex-wrap  p-5">
                    <p className="text-xl font-bold">
                        Name : <span>  {order.name}</span>
                    </p>
                    <p className="text-xl font-bold">
                        Address : <span>  {order.address}</span>
                    </p>
                    <p className="text-xl font-bold">
                        Phone number : <span>  {order.name}</span>
                    </p>
                </div>
                <p className="text-3xl p-5 font-bold">Products</p>
                <div className="flex  flex-row gap-2 flex-wrap justify-center items-center p-5">
                    {order.products.map(item => <Card id={item.product._id} price={item.product.price * item.howMach} src={item.product.imgURL[0]} title={item.product.title} key={item.product._id}></Card>)}
                </div>

            </>}
        </div>

    )
}