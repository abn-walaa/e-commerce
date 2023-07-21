import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"

export default function SliderAds({ data }) {

    let [page, setPage] = useState(0);
    let [x, setx] = useState(0);
    let [click, setClick] = useState(0);

    const handleClick = (i) => {
        if (page > i) {
            setx(1);
            setPage(i);
            setClick(i + 1);
        } else if (page < i) {
            setx(0);
            setPage(i);
            setClick(i + 1);
        }
    }
    // const handleDragLeave = (e) => {
    //     try {
    //         let elemnt2 = document.querySelector('#rrs')
    //         const initialPosition = elemnt2.offsetWidth / 2;
    //         const finalPosition = { x: e.clientX, y: e.clientY };
    //         if (finalPosition.x < initialPosition) {
    //             if (!(page - 1 >= 0)) {
    //                 return;
    //             }
    //             setx(0);
    //             setPage(n => n - 1)
    //             console.log("left")
    //         } else if (finalPosition.x > initialPosition) {
    //             if (!(page + 1 < data.length)) {
    //                 return;
    //             }
    //             setPage(n => n + 1)
    //             setx(1);

    //             console.log("right")

    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    return (
        <div className="h-full  relative rounded-2xl flex flex-row flex-wrap overflow-hidden " >
            <AnimatePresence  >
                <motion.div id="rrs" className=" w-full h-full"
                    initial={{ x: x === 0 ? "150vh" : "-150vh", position: "absolute", }}
                    animate={{ x: 0, position: "initial", }}
                    exit={{ x: x === 0 ? "-150vh" : "150vh", position: "absolute" }}
                    transition={{ duration: 0.75, staggerChildren: 0.07, delayChildren: 0.2 }}
                    key={page}
                    style={{ objectFit: 'cover' }}
                >
                    <img src={data[page].imgURL} alt="" className="rounded-2xl  block  w-full " draggable="false" />
                </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-2 left-1/2 flex cursor-pointer translate-x-[-50%] ">
                {data.map((e, i) => {
                    if (i === page) {
                        return <span key={i} className=" rounded-full black	   border-2 border-solid border-white p-1 mr-1 bg-white z-10" onClick={() => handleClick(i)}></span>
                    }
                    return <span key={i} className="rounded-full black	   border-2 border-solid border-white p-1 mr-1 z-10" onClick={(e) => { handleClick(i) }}></span>
                })}
            </div>
        </div >
    )
}