import { get, post } from '../utils/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 保存文章编辑记录
export const saveArticleRecord = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/publishOnline/saveArticleRecord`, data, successCb, failCb);
}

// 文章上传
export const publishArticle = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/publishOnline/publishArticle`, data, successCb, failCb);
} 

// 获取编辑记录
export const getEditRecord = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/publishOnline/getEditRecord`, data, successCb, failCb);
} 

// 获取编辑详情
export const getArticleDetail = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/publishOnline/getArticleDetail`, data, successCb, failCb);
} 

// 获取已发布文章信息
export const getPublishedArtilces = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/publishOnline/getPublishedArtilces`, data, successCb, failCb);
} 