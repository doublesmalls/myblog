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
// 新增文章
export function addArticle(parameter) {
  return axios({
    url: `/api/addArticle`,
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
// 删除文章
export function deleteArticle(parameter) {
  return axios({
    url: `/api/deleteArticle`,
    method: 'post',
    data: parameter
  });
}
// 编辑文章
export function editArticle(parameter) {
  return axios({
    url: `/api/editArticleContent`,
    method: 'post',
    data: parameter
  });
}