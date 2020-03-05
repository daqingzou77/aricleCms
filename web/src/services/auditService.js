import { get, post } from '../common/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 获取待审核文章列表
export const getAuditArticleList = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/article/getArticleList`, data, successCb, failCb);
};

// 条件查询文章信息
export const getArticlesByOptions = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/article/getArticleByOptions`, data, successCb, failCb);
}

// 查看审核详情
export const getAuditDetail = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/article/getArticleItem`, data, successCb, failCb);
} 

// 提交审核信息
export const pushAuditMessage = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/article/pushAuditMessage`, data, successCb, failCb);
}

// 确认审核内容
export const confirmAuditMessage = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/article/confirmAuditMessage`, data, successCb, failCb);
}
  
