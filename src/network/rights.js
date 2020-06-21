import {
    request
} from './axios'

export function getRights() {
    return request({
        url: 'rights/list'
    })
}