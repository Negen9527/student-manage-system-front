import request from '@/utils/request'

export function listStudent(){
  return request({
    url: '/student/list',
    method: 'get'
  })
}
export function addStudent(data){
  return request({
    url: '/student/add',
    method: 'post',
    data
  })
}

export function updateStudent(data){
  return request({
    url: '/student/update',
    method: 'post',
    data
  })
}

export function deleteStudent(id){
  return request({
    url: '/student/delete/' + id,
    method: 'post'
  })
}

export function searchStudent(data){
  return request({
    url: '/student/search',
    method: 'post',
    data
  })
}
