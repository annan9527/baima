import request from '@/utils/request'

export function add(data) {
return request({
url: 'api/smartGird',
method: 'post',
data
})
}

export function del(ids) {
return request({
url: 'api/smartGird/',
method: 'delete',
data: ids
})
}

export function edit(data) {
return request({
url: 'api/smartGird',
method: 'put',
data
})
}

// 查询微网格列表
export function smartGirdall(data){
     return request({
        url:'api/smartGird',
        data
     })
}
export default { add, edit, del }
