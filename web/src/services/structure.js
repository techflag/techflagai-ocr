import request from '@/utils/request.js'

export function page(data) {
    return request(
        '/ocr/structure/page',
        'get',
         data
    )
}

export function find(data) {
    return request(
        '/ocr/structure/find',
        'get',
        data
    )
}


export function save_or_update(data) {
    return request(
        '/ocr/structure/save_or_update',
         'post',
         data
    )
}
