import request from '@/utils/request'

export function add(data) {
return request({
url: 'api/gird',
method: 'post',
data
})
}

export function del(ids) {
return request({
url: 'api/gird/',
method: 'delete',
data: ids
})
}

export function edit(data) {
return request({
url: 'api/gird',
method: 'put',
data
})
}

// 查询网格
export function girdall() {
    return request({
    url: 'api/gird',
    method: 'get',
   
    })
    }

export default { add, edit, del }
