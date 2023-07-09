import { useContext, useEffect, useState } from "react"
import GetCart from "../../Hooks/GetCart"
import CardCart from "../components/CardCart"
import Order from "../components/Order"
import { UserContext } from "../../Hooks/UserContext"
import { Link } from "react-router-dom"
import ProfilePop from "../components/ProfilePop"
export default function Cart() {

    let [products, setProducts] = useState(GetCart())
    let [totle, setTotle] = useState()
    let [open, setOpen] = useState(false)
    let [order, setOrder] = useState(false)

    const { user, token } = useContext(UserContext)

    function prodcutsAmount(value, position) {
        console.log(products[position])
        console.log(value)
        setProducts(e => {
            console.log(e)
            let ar = [...e]
            ar[position].howMach = value
            return ar
        })
    }

    useEffect(() => {
        if (products) {
            setTotle(e => {
                let count = 0;
                products.forEach(e => {
                    count += e.howMach * e.product.price
                })
                return count
            })
        }
        localStorage.setItem('Cart', JSON.stringify(products))
    }, [products])

    return (<>
        <div className="m-auto bg-white p-4 max-w-[1600px]  mt-20 flex justify-between   rounded-md ">
            {!order && !products &&
                <div className="w-full h-[50vh] flex justify-center items-center flex-col gap-5">
                    <p className="text-2xl font-[600] opacity-60">The card is empty . add some products</p>
                    <Link to={"/"} className="opacity-60 p-2 bg-black rounded-lg text-white">View product</Link>
                </div>
            }

            {!order && products &&
                <>
                    {products && <div className="  flex flex-col gap-5 ">
                        {products.map((e, i) => {
                            return <CardCart item={e} setTotle={prodcutsAmount} i={i}></CardCart>
                        })}
                    </div>}
                    <div className="p-5 border-2  flex flex-col rounded-md ">
                        <div>
                            {products.map(item => {
                                return (<div>
                                    <div className="text-xl font-[600] flex flex-row justify-between p-2   "><div>
                                        <span className="pr-1">{item.howMach} </span><span className="w-20 overflow-ellipsis pr-2">{item.product.title}</span>
                                    </div>
                                        <span className="text-xl text-green-700 "> {item.product.price}<span className="text-sm">$</span> </span>
                                    </div>
                                </div>)
                            })}
                        </div>
                        <div className="mt-auto">
                            <div className="mt-auto mb-4 text-lg font-[700] pb-10 ">
                                Totel: <span className="text-green-600">{totle}<span className="text-sm">$</span></span>
                            </div>
                            <button className="mt-auto  text-4xl w-full text-center bg-black text-white p-4 font-[600] rounded-md content-center hover:bg-[#1c1c19ed]"
                                onClick={e => {
                                    if (user) {
                                        setOrder(e => !e)
                                    } else {

                                        setOpen(true)

                                    }

                                }}
                            >
                                Order now <i className='bx bx-caret-right text-base' >
                                </i>
                            </button >
                            <div className="p-2 pl-0 content-center items-center text-start mt-2 text-base font-[600] ">
                                <i className='bx bxs-car '  ></i> Request upon receipt
                            </div>
                        </div>
                    </div>
                </>}


            {order && products && <Order products={products} totle={totle} user={user} token={token} setProducts={setProducts} setOrder={setOrder}></Order>}

            {/* done the order */}
            {order && !products &&
                <div className="w-full h-[50vh] flex justify-center items-center flex-col gap-5">
                    <p className="text-2xl font-[600] opacity-100">Done the order </p>
                    <Link to={"/order/" + order} className="opacity-60 p-2 bg-black rounded-lg text-white">View order</Link>
                </div>
            }
        </div>
        {/* loging */}
        {open && <ProfilePop isOpen={open} setOpen={setOpen}></ProfilePop>}


    </>)
}