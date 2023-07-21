import React, { useContext, useState } from "react";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import ProfilePop from "./ProfilePop";
import { UserContext } from "../../Hooks/UserContext";
export default function Header() {
    let [isOpen, setOpen] = useState(false)
    let [isOpenPrfile, SetisOpenPrfile] = useState(false)
    let { user } = useContext(UserContext)
    return (
        <>
            <SideBar isOpen={isOpen} setOpen={setOpen}></SideBar>

            <div className=" bg-white  m-auto p-2 rounded-b-lg flex flex-row justify-between items-center ">

                <i className='bx bx-menu-alt-left text-3xl text-black mr-5' onClick={() => { setOpen(e => !e) }}></i>

                <Link to={"/"} className="text-center text-xl font-bold ">
                    ABN Walaa
                </Link>
                <div>
                    <Link to={"/cart"}>
                        <i class='bx bx-cart text-3xl'></i>
                    </Link>

                    {user ? <i class={'bx bx-user-circle text-3xl    rounded-full ml-2  ' + (isOpenPrfile === false ? "text-black" : "text-blue-400")} onClick={() => SetisOpenPrfile(e => !e)} ></i> : <i className={'bx bxs-user-circle text-3xl    rounded-full ml-2 ' + (isOpenPrfile === false ? "text-black" : "text-blue-400")} onClick={() => SetisOpenPrfile(e => !e)}></i>}
                </div>
            </div>
            <ProfilePop isOpen={isOpenPrfile} setOpen={SetisOpenPrfile}></ProfilePop>
        </>
    )
}