export default async function getSlider(setSliders, setError) {
    try {
        let data = await fetch('http://localhost:3001/slider/', {
            method: "get"
        }).then(res => {
            if (!res.ok) {
                throw new Error("Respons error")
            }
            return res.json()
        })
        console.log(data, "asdasdasasdasd")
        if (!data) {
            setError("no sliders")
        }
        setSliders(data)

    } catch (error) {
        setError(error)
    }
}
