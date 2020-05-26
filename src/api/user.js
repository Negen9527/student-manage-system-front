import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/login?username='+ data.username +'&password=' + data.password,
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}



export function updateUserInfo(data) {
  return request({
    url: '/user/info/update',
    method: 'post',
    data
  })
}

export function updateUserPassword(data) {
  return request({
    url: '/user/info/updatePassword',
    method: 'post',
    data
  })
}
