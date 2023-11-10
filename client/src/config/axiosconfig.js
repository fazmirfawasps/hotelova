import axios from 'axios'

const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
    ? 'https://admin.hotelova.site/server/admin'
    : 'http://localhost:4000/server/users',
    // withCredentials: true,
})
export default Axios


