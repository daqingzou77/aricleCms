import { get, post } from '../common/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 获取评论列表
export const getCommentList = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getCommentList`, data, successCb, failCb);
}

// 查看评论详情
export const watchCommetDetail = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/watchCommetDetail`, data, successCb, failCb);
}

// 查看赞列表
export const getStarList = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getStarList`, data, successCb, failCb);
}

// 获取私信列表
export const getPrivateLetter = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getPrivateLetter`, data, successCb, failCb);
}

// 获取新的好友请求
export const getFriendRequest = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getFriendRequest`, data, successCb, failCb);
}

// 同意或拒绝好友请求
export const solveFriendRequest = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/messageCenter/solveFriendRequest`, data, successCb, failCb);
}

// 好友动态
export const getFriendUpdates = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/messageCenter/getFriendUpdates`, data, successCb, failCb);
}
  