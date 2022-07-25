import request from '@/utils/request'


export function add(data) {
  return request({
    url: 'api/collective/income/add',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/collective/income/delete?id=' + ids[0],
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: 'api/collective/income/update',
    method: 'post',
    data
  })
}
export default { add, edit, del }

