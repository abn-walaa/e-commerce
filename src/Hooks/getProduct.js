import axios from "axios"
export default async function getProduct(productID, setError, signal) {
    try {
        console.log('http://localhost:3001/products/' + productID, { signal })
        let data = await axios.get('http://localhost:3001/products/' + productID).then(res => {
            return res.data
        })

        console.log(data)
        if (!data) {
            setError("no products")
        }
        return data
    } catch (error) {
        setError(error)
    }
}