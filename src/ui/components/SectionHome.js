import { useEffect, useState } from "react";
import SliderBox from "./SliderBox"
import { Loading } from "./Loading";
import getProductsOfCollection from "../../Hooks/getProductsOfCollection";
import Card from "./Card";
export default function SectionHome({ collection }) {
    let [products, setProducts] = useState(null)
    let [error, setError] = useState(null)
    useEffect(() => {
        getProductsOfCollection(collection._id, setError, 0,).then(data => setProducts(data))
    }, [collection])

    if (error) {
        return;
    }
    console.log(products)
    return (
        <div>
            {!products && <Loading></Loading>}
            {products && <SliderBox title={collection.name} id={collection._id}>
                {products.map(product => {
                    return <Card id={product._id} key={product._id} price={product.price} src={product.imgURL[0]} title={product.title}></Card>
                })}
            </SliderBox>}
        </div>
    )
}