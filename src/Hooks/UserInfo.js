import axios from "axios"
export default function UserInfo(token, setUser) {
    try {

        axios.get('http://localhost:3001/user/info', {
            headers: {
                authorization: "Bearer " + token
            }
        }).then(e => setUser(e.data)).catch(e => console.log(e))
    } catch (error) {

    }
}