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