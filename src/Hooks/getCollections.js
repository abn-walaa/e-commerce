export default async function getCollections(setCollection) {
    try {
        let data = await fetch('http://localhost:3001/collection').then(e => {
            if (!e.ok) {
                throw new Error("Error with respnons")
            }
            return e.json()
        })
        setCollection(data)
    } catch (error) {
        console.log(error)
    }
}