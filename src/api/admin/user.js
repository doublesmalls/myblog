import {
  axios
} from '@/utils/request';

export function getUserList(parameter) {
  return axios({
    url: `/api/user/getUserList`,
    method: 'get',
    params: parameter
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