import {
  axios
} from '@/utils/request';

export function getUserList(parameter) {
  return axios({
    url: `/api/user/getUserList`,
    method: 'post',
    data: parameter
  });
}
export function deleteUser(parameter) {
  return axios({
    url: `/api/user/deleteUserInfo`,
    method: 'post',
    data: parameter
  });
}
// 注册
export function signUser(parameter) {
  return axios({
    url: `/api/userSign`,
    method: 'post',
    data: parameter
  });
}
// 登录
export function loginUser(parameter) {
  return axios({
    url: `/api/user/userLogin`,
    method: 'post',
    data: parameter
  });
}
// 获取用户信息
export function getUserInfo(parameter) {
  return axios({
    url: `/api/user/getUserInfo`,
    method: 'post',
    data: parameter
  });
}
// 退出登录
export function userLogout(parameter) {
  return axios({
    url: `/api/user/userLogout`,
    method: 'get',
    params: parameter
  });
}

// 搜索用户名
export function searchUser(parameter) {
  return axios({
    url: `/api/searchUser`,
    method: 'post',
    data: parameter
  });
}

// 分配管理员
export function addManagePerson(parameter) {
  return axios({
    url: `/api/addManagePerson`,
    method: 'post',
    data: parameter
  });
}