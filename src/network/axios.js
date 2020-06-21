import axios from 'axios'

export function request(config) {
    const Axios = axios.create({
        baseURL: 'http://localhost:8888/api/private/v1/',
        timeout: 5000,
    })

    Axios.interceptors.request.use(res => {
        res.headers.Authorization = localStorage.getItem('token')
        return res
    }, err => {
        console.log(err);
        return err
    })
    Axios.interceptors.response.use(res => {
        return res
    }, err => {
        return err
    })
    return Axios(config)
}