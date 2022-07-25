import request from '@/utils/request'


export function add(data) {
  return request({
    url: 'api/smart/gird/add',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/smart/gird/delete?id=' + ids[0],
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: 'api/smart/gird/update',
    method: 'post',
    data
  })
}
export default { add, edit, del }

