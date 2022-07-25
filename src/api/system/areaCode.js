import request from '@/utils/request'

// 获取树形结构
export function tree() {
    return request({
      url: 'api/areaCode/role/tree',
      method: 'get'
    })
  }

  export function add(data) {
    return request({
      url: 'api/areaCode',
      method: 'post',
      data
    })
  }
  
  export function del(ids) {
    return request({
      url: 'api/areaCode',
      method: 'delete',
      data: ids
    })
  }
  
  export function edit(data) {
    return request({
      url: 'api/areaCode',
      method: 'put',
      data
    })
  }

  export default { add, edit, del }