import {request} from '@/utils/request'

/**
 * 获取数据集信息
 * @param {string} dataset_url - 数据集URL
 * @returns {Promise} - 返回请求Promise
 */
export function getDataset(dataset_url) {
  return request({
    url: `http://117.73.9.156:8083/api/api/datasets/find?dataset_url=${dataset_url}`,
    method: 'get'
  }).then(response => response)
    .catch(error => {
      console.error('Error fetching dataset:', error);
      throw error;
    });
}

/**
 * 更新数据集信息
 * @param {string} filename - 数据集文件名
 * @param {Object} data - 更新的数据
 * @returns {Promise} - 返回请求Promise
 */
export function updateDataset(filename, data) {
  return request({
    url: `/api/datasets/${filename}`,
    method: 'post',
    data
  })
}