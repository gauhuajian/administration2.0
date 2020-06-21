import {
    request
} from './axios'

export function getMenu() {

    return request({
        url: 'menus'
    })

}