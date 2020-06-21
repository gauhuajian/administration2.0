import {
    request
} from './axios'

export function userList(query = '', pagenum = 1, pagesize = 2) {
    return request({
        url: 'users',
        params: {
            query,
            pagenum,
            pagesize
        }
    })
}

export function addUsers(obj) {
    return request({
        url: 'users',
        method: 'post',
        data: {
            username: obj.username,
            password: obj.password,
            email: obj.email,
            mobile: obj.mobile
        }
    })
}

export function updateState(id, type) {
    return request({
        url: `users/${id}/state/${type}`,
        method: 'put'
    })
}

export function deleteUsers(id) {
    return request({
        url: `users/${id}`,
        method: 'delete',
    })
}

export function editUserData(obj) {
    return request({
        url: `users/${obj.id}`,
        method: 'put',
        data: {
            email: obj.email,
            mobile: obj.mobile
        }
    })
}

export function getRoles() {
    return request({
        url: 'roles'
    })
}

export function queryRid(id) {
    return request({
        url: `users/${id}`
    })
}

export function assignRoleData(id, rid) {
    return request({
        url: `users/${id}/role`,
        method: 'put',
        data: {
            rid
        }
    })
}