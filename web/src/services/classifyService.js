
import { get, post } from '../common/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 多关键词查询文章信息
export const getArticleByMutiKeys = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/article/getArticleByMutiKeys`, data, successCb, failCb);
};

/**
 * 分类-科学
 */ 
// 获取热门推荐
export const getHotRecommandFromScience = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/classify/getHotRecommandFromScience`, data, successCb, failCb);
}

// 实时更新
export const getLiveUpdateFromScience = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/classify/getLiveUpdateFromScience`, data, successCb, failCb);
}

// 科学小知识
export const getScienceTips = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/classify/getScienceTips`, data, successCb, failCb);
}

/**
 * 分类-历史
 */
 // 获取热门推荐
export const getHotRecommandFromHistory = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/classify/getHotRecommandFromHistory`, data, successCb, failCb);
}

// 实时更新
export const getLiveUpdateFromHistory = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/classify/getLiveUpdateFromHistory`, data, successCb, failCb);
}

// 科学小知识
export const getHistoricalStorys = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/classify/getHistoricalStorys`, data, successCb, failCb);
}

/**
 * 分类-文学
 */ 
// 获取热门推荐
export const getHotRecommandFromLitterateur = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/classify/getHotRecommandFromLitterateur`, data, successCb, failCb);
}

// 实时更新
export const getLiveUpdateFromLitterateur = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/classify/getLiveUpdateFromLitterateur`, data, successCb, failCb);
}

// 金句
export const getExcerpts = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/classify/getExcerpts`, data, successCb, failCb);
}

/**
 * 分类-健康
 */
// 获取热门推荐
export const getHotRecommandFromPhysic = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/classify/getHotRecommandFromPhysic`, data, successCb, failCb);
}

// 实时更新
export const getLiveUpdateFromPhysic = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/classify/getLiveUpdateFromPhysic`, data, successCb, failCb);
}

// 科学小知识
export const getSportSense = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/classify/getSportSense`, data, successCb, failCb);
} 

// 点赞、拉黑、收藏 - 文章
export const solveArticle = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/classify/solveArticle`, data, successCb, failCb);
}

// 点赞、拉黑 - 评论
export const solveComment = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/classify/solveArticle`, data, successCb, failCb);
}

// 评论文章
export const commentArticle = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/classify/commentArticle`, data, successCb, failCb);
}

// 获取文章评论
export const watchArticleComment = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/classify/watchArticleComment`, data, successCb, failCb);
}
