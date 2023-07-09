export default function AddtoCart(product, howMach = 1) {
    let Cart = localStorage.getItem("Cart") || 'undefined'


    let items = (Cart !== 'undefined' && Cart !== 'null') ? JSON.parse(localStorage.getItem("Cart")) : []

    if (items.length > 0) {
        let item = items.findIndex((e, i) => (e.product._id === product._id))

        if (item !== -1) {
            items[item].howMach += 1;
        } else {
            items.push({
                product,
                howMach
            })
        }
    } else {
        items.push({
            product,
            howMach
        })
    }


    localStorage.setItem("Cart", JSON.stringify(items))

    return product
}