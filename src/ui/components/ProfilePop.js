import { motion, AnimatePresence } from "framer-motion"
import LogIn from "./LogIn"
import LogUp from "./LogUp"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Hooks/UserContext"
import LogOut from "./LogOut"
import MyOrders from "./MyOrders"
import FargetPassword from "./FragetPassword"
export default function ProfilePop({ isOpen, setOpen }) {
    let { user, setUser } = useContext(UserContext)
    let [orderView, setOrderView] = useState(false)
    let [logOut, setLogOut] = useState(false)
    const [log, setLog] = useState("up")
    // useEffect(() => {
    //     setOpen(false)
    // }, [orderView, logOut])
    return (<>
        <AnimatePresence>
            {user && isOpen &&
                <>
                    <span className="fixed z-10 h-full w-full  bg-black  opacity-0 top-0  "
                        onClick={e => setOpen(e => !e)}>
                    </span>
                    <motion.div className="z-20  overflow-hidden absolute top-11 right-4 bg-white  text-white rounded-lg h-fit p-4 "
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "fit-content" }}
                        key={isOpen}
                        transition={{ type: "keyframes", duration: 0.2 }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {/* <div className="p-1 w-full cursor-pointer ">
                            <div className="text-2xl p-2 hover:bg-[#000030] w-full font-[600] rounded-md  bg-black text-white border-2">Create Account</div>
                        </div> */}
                        <div className="p-1 w-full cursor-pointer ">
                            <div className="text-2xl p-2 hover:bg-[#000030] w-full font-[600] rounded-md  bg-black text-white border-2 text-center"
                                onClick={(e => setOrderView(e => !e))
                                }
                            >My orders</div>
                        </div>
                        <div className="p-1 w-full cursor-pointer ">
                            <div className="text-2xl p-2 hover:bg-[#000030] w-full font-[600] rounded-md  bg-black text-white border-2 text-center" onClick={() => {
                                setLogOut(e => !e)
                                setOpen(e => !e)
                            }} >LOG OUT</div>
                        </div>
                        {user.roll === "admin" && <div className="p-1 w-full cursor-pointer ">
                            <div className="text-2xl p-2 hover:bg-[#000030] w-full font-[600] rounded-md  bg-black text-white border-2 text-center"

                            >Admin</div>
                        </div>}
                    </motion.div>

                </>
            }



            {user && logOut && <>
                <LogOut setOpen={setLogOut}  ></LogOut>
            </>}
            {!user && isOpen && log === "up" && <>
                <span className="fixed w-full h-full bg-black z-10 opacity-40 top-0" onClick={() => setOpen(e => !e)} ></span>
                <div className="fixed top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white z-20 rounded-[30px]  ">
                    <div className="p-9 flex justify-center flex-col items-center ">
                        <i className='bx bxs-user-circle text-9xl p-5 pb-8 pt-0 block '  ></i>
                        <LogUp   ></LogUp >
                        <div className="flex flex-row  justify-between gap-10 mt-4 w-full pl-1 pr-1">
                            <button className="block font-bold " onClick={() => setLog('in')}>Log in ? </button>

                        </div>
                    </div>
                </div>
            </>}
            {!user && isOpen && log === "in" && <>
                <span className="fixed w-full h-full bg-black z-10 opacity-40 top-0" onClick={() => setOpen(e => !e)} ></span>
                <div className="fixed top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white z-20 rounded-[30px]  ">
                    <div className="p-9 flex justify-center flex-col items-center ">
                        <i className='bx bxs-user-circle text-9xl p-5 pb-8 pt-0 block '  ></i>
                        <LogIn setOpen={setOpen}></LogIn>
                        <div className="flex flex-row  justify-between gap-10 mt-4 w-full pl-1 pr-1">
                            <button className="block font-bold " onClick={() => setLog("up")}>Create new account </button>
                            <button className="block font-bold" onClick={(e) => setLog("password")}> forgat password ?</button>
                        </div>
                    </div>
                </div>
            </>}
            {!user && isOpen && log === "password" && <>
                <span className="fixed w-full h-full bg-black z-10 opacity-40 top-0" onClick={() => setOpen(e => !e)} ></span>
                <div className="fixed top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white z-20 rounded-[30px]  ">
                    <div className="p-9 flex justify-center flex-col items-center ">
                        <i className='bx bxs-user-circle text-9xl p-5 pb-8 pt-0 block '  ></i>
                        <FargetPassword setLog={setLog}></FargetPassword>
                        <div className="flex flex-row  justify-between gap-10 mt-4 w-full pl-1 pr-1">
                            <button className="block font-bold" onClick={() => setLog("in")}> Log in</button>
                        </div>
                    </div>
                </div>
            </>}

        </AnimatePresence>
        {orderView && <MyOrders open={orderView} setOpen={setOrderView} />}
    </>)
}