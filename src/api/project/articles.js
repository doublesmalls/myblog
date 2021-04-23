import {
  axios
} from '@/utils/request';

// 获取文章列表
export function getArticleList(parameter) {
  return axios({
    url: `/api/getAllArticle`,
    method: 'post',
    data: parameter
  });
}
// 根据id获取文章内容
export function getArticleById(parameter) {
  return axios({
    url: `/api/getArticleContent`,
    method: 'post',
    data: parameter
  });
}
// 获取前5个文章
export function getArticleTopFive(parameter) {
  return axios({
    url: `/api/getArticleTopFive`,
    method: 'post',
    data: parameter
  });
}