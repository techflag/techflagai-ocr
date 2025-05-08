import {request} from '@/utils/request.js'

export function find(data) {
  return request(
    '/ocr/model/find',
    'get',
    data
  )
}


export function list(data) {
  return request(
    '/ocr/model/list', 
    'get',
    data
  )
}



// 获取文件
export function data_check_data(data) {
  return request(
      '/ocr/train/data_check_data',
      'post',
      data)
}

export function data_check(data) {
  return request(
      '/ocr/train/data_check',
      'post',
      data
  )
}