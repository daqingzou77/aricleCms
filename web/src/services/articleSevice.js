import { get, post, deletes, put } from '../utils/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 获取文章信息列表
export const getArticleList = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/article/getArticleList`, data, successCb, failCb);
};

// 条件查询文章信息
export const getArticleByOptions = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/article/getArticleByOptions`, data, successCb, failCb);
};

// 删除文章信息
export const deleteArticleItem = (data, successCb, failCb) => {
  deletes(`${scheduleBaseUrl}/api/article/deleteArticleItem`, data, successCb, failCb);
};

// 修改单篇文章信息
export const updateArticle = (data, successCb, failCb) => {
  put(`${scheduleBaseUrl}/api/article/updateArticle`, data, successCb, failCb);
};

// 获取文章处理信息
export const findArticleStatus = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/article/findArticleStatus`, data, successCb, failCb);
};

// 处理单例文章信息
export const solveArticleItem = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/article/solveArticleItem`, data, successCb, failCb);
};

// 点赞、拉黑、收藏-文章
export const solveArticle = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/article/solveArticle`, data, successCb, failCb);
};

// 评论文章
export const commentArticle = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/article/commentArticle`, data, successCb, failCb);
};

// 获取文章评论
export const getArticleComment = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/article/getArticleComment`, data, successCb, failCb);
};

// 点赞、拉黑评论
export const solveComment = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/article/solveComment`, data, successCb, failCb);
};

// 私信评论人
export const privateContact = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/article/privateContact`, data, successCb, failCb);
};