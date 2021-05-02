import {
  axios
} from '@/utils/request';

// 新增评论
export function addMessage(parameter) {
  return axios({
    url: `/api/addMessage`,
    method: 'post',
    data: parameter
  });
}

// 获取评论列表
export function getMessageList(parameter) {
  return axios({
    url: `/api/getMessageList`,
    method: 'post',
    data: parameter
  });
}

// 获取全部评论列表
export function getAllMessage(parameter) {
  return axios({
    url: `/api/getAllMessage`,
    method: 'post',
    data: parameter
  });
}

// 删除留言
export function deleteMessage(parameter) {
  return axios({
    url: `/api/deleteMessage`,
    method: 'post',
    data: parameter
  });
}