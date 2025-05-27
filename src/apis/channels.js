import request from 'utils/request'

/**
 * 获取频道列表
 * @returns {Promise} 返回频道列表的Promise对象
 */
export const getChannels = () =>{
  return request('/channels')
}