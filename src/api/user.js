import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/access/login',
    method: 'post',
    data
  })
}

export function getInfo(id) {
  return request({
    url: `/user/${id}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/access/logout',
    method: 'post'
  })
}
