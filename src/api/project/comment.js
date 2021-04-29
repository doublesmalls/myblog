import {
  axios
} from '@/utils/request';

// 新增留言
export function addComment(parameter) {
  return axios({
    url: `/api/addComment`,
    method: 'post',
    data: parameter
  });
}

// 获取留言列表
export function getCommentList(parameter) {
  return axios({
    url: `/api/getCommentList`,
    method: 'post',
    data: parameter
  });
}

// 获取全部留言列表
export function getAllComment(parameter) {
  return axios({
    url: `/api/getAllComment`,
    method: 'post',
    data: parameter
  });
}

// 删除留言
export function deleteComment(parameter) {
  return axios({
    url: `/api/deleteComment`,
    method: 'post',
    data: parameter
  });
}

// 获取前3个留言
export function getTopThreeList(parameter) {
  return axios({
    url: `/api/getCommentTopThree`,
    method: 'post',
    data: parameter
  });
}