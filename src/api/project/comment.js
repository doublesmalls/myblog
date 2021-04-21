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
    url: `/api/addComment`,
    method: 'post',
    data: parameter
  });
}