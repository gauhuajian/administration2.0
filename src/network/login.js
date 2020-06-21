import {
    request
} from './axios'

export function login(obj) {
    return request({
        url: 'login',
        method: 'post',
        data: {
            username: obj.username,
            password: obj.password
        }
    })
}