import request from '@/utils/request'
export function send(data) {
  return request({
    url: 'api/sms/add',
    method: 'post',
    data
  })
}
