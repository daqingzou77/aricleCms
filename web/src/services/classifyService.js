
import { get, post, deletes, put } from '../common/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 多关键词查询文章信息
export const getArticleByMutiKeys = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/article/getArticleByMutiKeys`, data, successCb, failCb);
};