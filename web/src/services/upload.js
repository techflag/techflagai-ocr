import {request} from '@/utils/request'

export function showFile(data) {
    return request(
        '/api/file/showFile',
        'get',
        data
    )
}
export function showFileTxt(data) {
    return request(
         '/api/file/showFile',
        'get',
         data
    )
}

export function upload(data) {
    return request(
         '/api/file/upload',
        'post',
        data
    )
}
