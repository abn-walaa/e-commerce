export default function GetCart() {
    let cart = localStorage.getItem('Cart')
    return cart !== 'undefined' ? JSON.parse(cart) : null
}