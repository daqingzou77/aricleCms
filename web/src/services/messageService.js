import { get, post, deletes } from '../common/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 获取最新评论数目
export const getCommentCounts = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getCommentCounts`, data, successCb, failCb);
}

// 获取评论列表
export const getCommentList = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getCommentList`, data, successCb, failCb);
}

// 获取最新评论点赞数
export const getCommentStarsCounts = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getCommentStarsCounts`, data, successCb, failCb);
}

// 获取最新文章点赞数目
export const getStarCounts = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getStarCounts`, data, successCb, failCb);
}

// 查看赞列表
export const getStarList = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getStarList`, data, successCb, failCb);
}

// 获取私信列表
export const getPrivateLetter = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getPrivateLetter`, data, successCb, failCb);
}

// 删除单例私信
export const deletePrivateItem = (data, successCb, failCb) => {
  deletes(`${scheduleBaseUrl}/api/messageCenter/deletePrivateItem`, data, successCb, failCb);
}

// 获取新的好友请求
export const getFriendRequest = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getFriendRequest`, data, successCb, failCb);
}

// 同意或拒绝好友请求
export const solveFriendRequest = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/messageCenter/solveFriendRequest`, data, successCb, failCb);
}

// 获取最新动态数目
export const getUpdatesCount = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getUpdatesCount`, data, successCb, failCb);
}

// 查看好友动态
export const getFriendUpdates = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/getFriendUpdates`, data, successCb, failCb);
}
  
// 记录弹窗关闭时间
export const recordModalTime = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/messageCenter/recordModalTime`, data, successCb, failCb);
}