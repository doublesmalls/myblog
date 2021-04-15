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