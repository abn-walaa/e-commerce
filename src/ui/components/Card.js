import React from "react";
import { Link } from "react-router-dom";

export default function Card({ title, price, src, id }) {

    return (
        <Link className="flex flex-col  rounded  w-[250px]  flex-shrink-0  rounded-t-lg " to={"/product/" + id} key={id} >
            <div className={`block pt-[160%] bg-center bg-cover rounded-lg overflow-hidden rounded-b-none `} style={{ backgroundImage: `url('${src}')` }}>
            </div>
            <div className="pr-10  bg-[#ffffff61] rounded-b-lg">
                <h1 className="pl-3 pt-2 pb-2  text-base  font-[600] ">{title}</h1>
                <div className="pb-5 -mr-6 -mb-2 flex flex-row justify-between items-center ">
                    <p className="text-xl 	text-green-700 font-medium pl-3  flex flex-row ">
                        <p>  {price}<span className="text-xs">$</span> </p></p>
                    <i className='bx bx-cart-add text-black text-3xl  '>
                    </i>
                </div>
            </div>
        </Link>
    )
}