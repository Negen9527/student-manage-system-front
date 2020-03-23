import request from '@/utils/request'

export function listTeacher(){
  return request({
    url: '/teacher/list',
    method: 'get'
  })
}


export function addTeacher(data){
  return request({
    url: '/teacher/add',
    method: 'post',
    data
  })
}


export function updateTeacher(data){
  return request({
    url: '/teacher/update',
    method: 'post',
    data
  })
}


export function deleteTeacher(id){
  return request({
    url: '/teacher/delete/' + id,
    method: 'post'
  })
}

export function searchTeacher(data){
  return request({
    url: '/teacher/search',
    method: 'post',
    data
  })
}
