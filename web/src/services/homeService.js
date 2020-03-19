import { get } from '../common/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 每日推送
export const getDailyPush = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/home/getDailyPush`, data, successCb, failCb);
};

// 热门作者
export const getHotAuthor = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/home/getHotAuthor`, data, successCb, failCb);
};

// 热门文章
export const getHotArticles = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/home/getHotArticles`, data, successCb, failCb);
};

// 作者更新
export const getAuthorUpdate = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/home/getAuthorUpdate`, data, successCb, failCb);
};

// 热门评论
export const getHotComments = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/home/getHotComments`, data, successCb, failCb);
};
  
// 数据统计
export const getStatics = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/home/getStatics`, data, successCb, failCb);
};
