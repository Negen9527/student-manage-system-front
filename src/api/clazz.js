import request from '@/utils/request'

export function listClazz(){
  return request({
    url: '/clazz/list',
    method: 'get'
  })
}


export function updateClazz(data){
  return request({
    url: '/clazz/update',
    method: 'post',
    data
  })
}


export function deleteClazz(id){
  return request({
    url: '/clazz/delete/' + id,
    method: 'post'
  })
}


export function addClazz(data){
  return request({
    url: '/clazz/add/',
    method: 'post',
    data
  })
}

export function getGrades(){
  return request({
    url: '/clazz/grades',
    method: 'get'
  })
}

export function getClazzs(grade){
  return request({
    url: '/clazz/clazzs?grade=' + grade,
    method: 'get',
  })
}
