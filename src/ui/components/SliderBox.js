import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"
import { motion } from "framer-motion";
export default function Slider({ children, title, id }) {

    const [Width, setWidth] = useState(0);
    const [postion, setPostion] = useState(0);
    const E = useRef();
    useEffect(() => {
        console.log()
        setWidth(E.current.offsetWidth - E.current.scrollWidth)
    }, [])
    return (

        <div>
            <div className="flex flex-row justify-between items-center text-2xl mb-5 mt-8">
                <p className="first-letter:uppercase font-semibold">{title}</p>
                <Link to={"/collection/" + id}><i className='bx bx-right-arrow-alt text-3xl'></i></Link>
            </div>
            <div>
                <motion.div className="relative" >
                    <i className='bx bx-chevron-right absolute -right-5 z-50  text-3xl text-white  rounded-full bg-black cursor-pointer -translate-y-1/2 top-[45%]' onClick={() => setPostion(n => n - 400)}></i>
                    <motion.div className="overflow-hidden relative" ref={E}>
                        <motion.div className="flex flex-row   cursor-grab gap-4 "
                            drag="x"
                            dragConstraints={{ right: 0, left: Width }}
                            whileTap={{ cursor: "grabbing" }}
                            // onDrag={e => setPostion(e.x)}
                            animate={{ x: Width >= postion + 250 ? setPostion(0) : postion }}
                            transition={{ type: "keyframes" }}
                        >
                            {children}
                        </motion.div>
                    </motion.div >
                </motion.div >
            </div>
        </div >



    )
}