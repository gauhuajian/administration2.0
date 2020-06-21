import {
    request
} from './axios'

export function getCartgory(type) {
    return request({
        url: 'categories',
        params: {
            type
        }
    })
}

export function addCartgory(cat_name, arr) {
    return request({
        url: 'categories',
        method: 'post',
        data: {
            cat_name,
            cat_pid: arr[arr.length - 1],
            cat_level: arr.length
        }
    })
}