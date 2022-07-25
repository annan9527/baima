import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/tbUsers',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/tbUsers/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/tbUsers',
    method: 'put',
    data
  })
}

// 获取所有用户查询列表
export function check(data) {
  return request({
    url: 'api/tbUsers?userName=' + data,
    method: 'get',
    data
  })
}

export function Init(data) {
   return request({
    url: 'api/tbUsers',
    method: 'get',
    data
  })
}



export default {
  add,
  edit,
  del
}
