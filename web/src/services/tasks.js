import {request} from '@/utils/request.js'

export function query(data) {
    return request(
        '/ocr/task/query',
        'get',
        data
    )
}

export function save(data, file) {
    const formData = new FormData()
    formData.append('file', file)
    Object.keys(data).forEach(key => {
        formData.append(key, data[key])
    })
    return request(
        '/ocr/task/save',
        'post',
        formData
    )
}

export function dataSetupload(data, file) {
    const formData = new FormData()
    formData.append('file', file)
    Object.keys(data).forEach(key => {
        formData.append(key, data[key])
    })
    return request(
        '/ocr/task/dataSetupload',
        'post',
        formData
    )
}

export function readExcel(data) {
    return request(
        '/ocr/task/read_excel',
        'get',
        data
    )
}

export function submit(data) {
    return request(
        '/ocr/task/submit',
        'post',
        data
    )
}

export function test() {
    return request(
        '/ocr/task/test',
        'get'
    )
}

export function list(data) {
    return request(
        '/ocr/task/list',
        'get',
        data
    )
}

export function find(data) {
    return request(
        '/ocr/task/find',
        'get',
        data
    )
}

export function statusCount() {
    return request(
        '/ocr/task/status_count',
        'get'
    )
}

export function update(data) {
    return request(
        '/ocr/confidence/update',
        'post',
         data
    )
}


export function task_names() {
    return request(
        '/ocr/task/names',
        'get'
    )
}

export function update_data_set(data) {
    return request(
        '/ocr/task/update_data_set',
        'post',
         data
    )
}