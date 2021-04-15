import {
  axios
} from '@/utils/request';

// 获取文章列表
export function getArticleList(parameter) {
  return axios({
    url: `/api/getArticleList`,
    method: 'post',
    data: parameter
  });
}