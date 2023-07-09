import { motion, AnimatePresence } from "framer-motion"
import { useContext } from "react"
import { UserContext } from "../../Hooks/UserContext"
import { Link } from "react-router-dom"


export default function SideBar({ isOpen, setOpen }) {

    let { collections } = useContext(UserContext)
    return (<div>
        <AnimatePresence>
            {isOpen && (<>
                <span className="fixed z-10 h-full w-full  bg-black  opacity-40 "
                    onClick={e => setOpen(e => !e)}>
                </span>
                <motion.div className="h-[100%] fixed left-0 top-0  bg-white pt-0  z-20 rounded-tr-[15px] rounded-br-[15px] "
                    animate={{ x: 0 }}
                    key={isOpen}
                    initial={{ x: "-50vh" }}
                    transition={{ type: "keyframes" }}
                    exit={{ x: "-50vh" }}
                >
                    <div className="p-2   pt-3 pb-2 text-3xl font-semibold border-b pr-44 border-[#00000030]">
                        Main mmine
                    </div>
                    {collections &&
                        collections.map(e => {
                            return <Link to={"/collection/" + e._id} key={e._id} className="relative p-2 font-extrabold   pt-4 pb-4 text-xl  border-b pr-32 border-[#00000010] block">
                                {e.name}
                                <i className='bx bxs-left-top-arrow-circle bx-rotate-90 rotate-90 text-xl absolute top-[53%] -translate-y-1/2 right-3'></i>
                            </Link>
                        })
                    }
                </motion.div></>)}

        </AnimatePresence>


    </div>


    )
} 
