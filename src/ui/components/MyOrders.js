import { useContext } from "react"
import { Link } from "react-router-dom";
import GetAllOrders from "../../Hooks/getAllOrders"
import { UserContext } from "../../Hooks/UserContext"
export default function MyOrders({ open, setOpen, SetMmuneHeader }) {
    const { token } = useContext(UserContext)
    const { orders, error, setOrders } = GetAllOrders(token)
    console.log(orders)
    return (
        <>
            {open && orders &&
                <>
                    <span className="absolute top-0 left-0 w-full h-full bg-black opacity-25 z-20" onClick={() => setOpen(e => !e)}></span>

                    <div className="flex flex-col gap-5 absolute p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-30 rounded-md max-h-[30vh] overflow-x-hidden overflow-y-scroll">
                        {orders.orders.map(e => <Link to={"/order/" + e._id} className="p-2 text-xl gap-10 font-[600] border-2 rounded-lg block"
                            onClick={() => setOpen(e => !e)}
                        >
                            <div className="pb-2">
                                Order#{e._id}
                            </div>
                            <div>
                                status : {e.status}
                            </div>
                        </Link>
                        )}


                    </div>
                </>
            }
        </>)
}
