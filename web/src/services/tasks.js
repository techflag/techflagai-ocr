import {request} from '@/utils/request.js'

export function query(data) {
    return request(
        '/ocr/task/query',
        'get',
        data
    )
}

export function save(data, files) {
    const formData = new FormData()
    // 逐个添加文件
    files.forEach(file => {
        formData.append('file', file)  // 每个文件单独添加
    })
    formData.append('data_set_id', data)
    
    // 调试输出
    for (let [key, value] of formData.entries()) {
        console.log(key, value)
    }
    
    return request(
        '/ocr/task/save',
        'post',
        formData,
        {'Content-Type': 'multipart/form-data'}
    )
}

export function dataSetupload(data, files) {
    const formData = new FormData()
    files.forEach(file => {
        formData.append('file', file)  // 每个文件单独添加
    })
    formData.append('data_set_id', data)
    return request(
        '/ocr/task/dataSetupload',
        'post',
        formData
    )
}

export function read_excel(data) {
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
/**
 * 切割图片为训练用的数据集
 * @param {} data 
 * @returns 
 */
export function cutting_img(data) {
    return request(
        '/train/cutting_img',
        'post',
         data
    )
}

export function save_version(data) {
    return request(
        '/ocr/task/save_version',
        'post',
        data
    )
}