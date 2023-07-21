import axios from "axios"
export default async function getProductsOfCollection(collectionID, setError, page = 0, setisMore, signal) {
    try {
        console.log(page)
        let data = await axios.post('http://localhost:3001/collection/' + collectionID, { skip: page, signal }).then(res => {
            return res.data
        })
        // console.log(data)
        if (data.length === 0) {
            setisMore(false)
            setError("no products")
        }
        console.log(data)
        return data
    } catch (error) {

        setError(error)
    }
}