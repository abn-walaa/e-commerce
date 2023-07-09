import { useEffect, useRef, useState } from "react"
import { Loading } from "../components/Loading"
import { useLocation } from "react-router-dom"
import getProduct from "../../Hooks/getProduct"
import SectionHome from "../components/SectionHome"
import AddtoCart from "../../Hooks/AddtoCart"

export default function Product() {
    let [error, setError] = useState()
    let [product, setProduct] = useState()
    let [img, setImg] = useState()
    let productID = useLocation().pathname.split('product/')[1]

    useEffect(() => {
        let control = new AbortController()

        getProduct(productID, setError, control.signal).then(data => {
            setProduct(data)
            setImg(data.imgURL[0])
        })

        return () => {
            setProduct()
            control.abort()
        }
    }, [productID])


    let button = useRef()
    return (<>
        {!error && !product && <Loading />}
        {!error && product &&

            <div className=" m-auto 	  mt-5 p-5 bg-white  container    " key={productID}>
                <div className=" sm:grid-cols-1 grid grid-cols-2  gap-5">
                    <div className="flex flex-col justify-center items-center">
                        <div className="  rounded-3xl">
                            <img src={img} alt="" className="w-[600px] mb-5 rounded-3xl " />

                        </div >
                        <div className="flex flex-row gap-3 max-w-full overflow-auto overflow-y-hidden pr-5  ">

                            {product.imgURL.map(e => <img src={e} alt="" className="rounded-lg  w-20 " onClick={(e) => {
                                setImg(e.target.src)
                            }} />)}

                        </div>
                    </div>
                    <div className="h-full flex flex-col">
                        <p className="text-3xl font-medium pb-10 pt-5" >{product.title}</p>
                        <p className="text-2xl text-green-600 pt-5 pb-2 font-semibold">{product.price}<span className="text-sm">$</span></p>
                        {product.description && <p className="text-lg  font-[500] max-w-4xl pb-5">{product.description}</p>}
                        <button className="flex justify-center rounded-full  m-auto mt-auto mb-5 p-5 text-xl bg-black text-white pl-5 pr-10 w-full font-bold items-center content-center text-center disabled:bg-[#000000cc] disabled:cursor-progress" ref={button}
                            onClick={async () => {
                                button.current.disabled = true
                                await AddtoCart(product, 1)

                                button.current.disabled = false

                            }}
                        ><i class='bx bxs-cart-add pr-2 text-3xl text-center'></i> Add to Card
                        </button>

                    </div>
                </div>
                {product.Collection && <div className="pl-5 pt-1 pr-5 pb-10 mt-10">
                    <SectionHome collection={product.Collection} />
                </div>}
            </div>

        }
    </>)
}