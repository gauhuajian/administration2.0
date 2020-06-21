import {
    request
} from './axios'


//表格数据
export function getRoles() {
    return request({
        url: 'roles'
    })
}

// 商品
export function getRights() {
    return request({
        url: 'rights/tree'
    })
}
//授权
export function accredit(id, rids) {
    return request({
        url: `roles/${id}/rights`,
        method: 'post',
        data: {
            rids: rids.join(',')
        }
    })
}
//添加
export function addRolesData(roleName, roleDesc) {
    return request({
        url: `roles`,
        method: 'post',
        data: {
            roleName,
            roleDesc
        }
    })
}
//删除
export function deleteRolesData(id) {
    return request({
        url: `roles/${id}`,
        method: 'delete'
    })
}
//编辑
export function editRolesData(id, roleName, roleDesc) {
    return request({
        url: `roles/${id}`,
        method: 'put',
        data: {
            roleName,
            roleDesc
        }
    })
}