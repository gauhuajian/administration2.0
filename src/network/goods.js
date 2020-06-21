import {
    request
} from './axios'

export function getGoods(query = '', pagenum = 1, pagesize = 4) {
    return request({
        url: 'goods',
        params: {
            query,
            pagenum,
            pagesize
        }
    })
}

export function getCartgory(type) {
    return request({
        url: 'categories',
        params: {
            type
        }
    })
}


export function addGoodsData(obj) {
    return request({
        url: `goods`,
        method: "post",
        data: {
            goods_name: obj.goods_name,
            goods_cat: obj.goods_cat.join(','),
            goods_price: obj.goods_price,
            goods_number: obj.goods_number,
            goods_weight: obj.goods_weight,
            goods_introduce: obj.goods_introduce,
            pics: obj.pics,
        }
    })
}

export function editGoodsData(obj) {
    return request({
        url: `goods/${obj.goods_id}`,
        method: `put`,
        data: {
            goods_name: obj.goods_name,
            goods_cat: obj.goods_cat.join(','),
            goods_price: obj.goods_price,
            goods_number: obj.goods_number,
            goods_weight: obj.goods_weight,
            goods_introduce: obj.goods_introduce,
            pics: obj.pics,
        }
    })
}