import { useState } from "react"

export default function CardCart({ item, setTotle, i }) {

    let product = item.product

    return (<div className=" flex flex-row items-center justify-start ">
        <div className=" flex flex-row  gap-4   ">
            <div className="pt-[50%] w-36   bg-center bg-cover  rounded-lg overflow-hidden " style={{ backgroundImage: `url('${product.imgURL[0]}')` }}></div>
            {/* <img src="http://localhost:3001/products/64998a4263b73e1ddaa3e5f2/0" alt="" className="  max-w-md max-h-40 rounded-md" /> */}
            <div className="flex flex-col justify-between p-2">
                <p className="w-full  line-clamp-2 overflow-ellipsis font-[600]   text-2xl">{product.title}</p>
                <div className="flex gap-10">
                    <p className="text-xl font-[600] text-green-700">{product.price * item.howMach}<span className="text-sm">$</span></p>
                    <input type="number" min={1} max={10} value={item.howMach} className="border-2 w-fit text-center text-xl m-0 rounded-md font-[600]" onChange={e => setTotle(e.target.value, i)} />
                </div>
            </div>
        </div>
        <div>

        </div>
    </div>)
}