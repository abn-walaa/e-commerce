
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import getProductsOfCollection from "../../Hooks/getProductsOfCollection";
import { useEffect, useState } from "react";
export default function Collection() {
    let c = useLocation().pathname.split('collection/')[1]

    let [page, setPage] = useState(0)
    let [isMore, setisMore] = useState(true)
    let [products, setProducts] = useState([])
    let [error, setError] = useState()

    useEffect(() => {
        let control = new AbortController()
        getProductsOfCollection(c, setError, 0, setisMore, control).then(data => setProducts(data))
        setPage(10)
        setisMore(true)
        return () => {

            control.abort()
        }
    }, [c])



    return (
        <>
            <div className="m-5"></div>
            <div className="container m-auto max-w-[1600px] ">
                {products.length > 0 &&
                    <div className="flex flex-row justify-between items-center text-2xl mb-5 mt-8 pl-4">
                        <p className="first-letter:uppercase font-semibold">{products[0]?.Collection.name}</p>
                    </div>}

                <div className="flex flex-row flex-wrap gap-3 justify-center items-center">
                    {products &&
                        <>

                            {products.map(product => {

                                return <Card id={product._id} key={product._id} price={product.price} src={product.imgURL[0]} title={product.title}></Card>
                            })}
                        </>

                    }
                </div>
                {products.length > 0 && isMore && <div className="w-full flex justify-center" onClick={() => {
                    getProductsOfCollection(c, setError, page, setisMore).then(data => setProducts(e => e.concat(data)))
                    setPage((n) => n + 10)
                }}>
                    show more
                </div>
                }
            </div>
        </>
    )
}