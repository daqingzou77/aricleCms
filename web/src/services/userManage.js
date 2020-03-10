import { get, post, deletes, put } from '../common/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 获取用户列表
export const getUserList = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/user/getUserList`, data, successCb, failCb);
};

// 条件查询用户
export const getUserByOptions = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/user/getUserByOptions`, data, successCb, failCb);
};

// 添加用户
export const addUserParam = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/user/addUserParam`, data, successCb, failCb);
};

// 删除单个用户
export const deleteUserItem = (data, successCb, failCb) => {
  deletes(`${scheduleBaseUrl}/api/user/deleteUserItem`, data, successCb, failCb);
};

// 批量删除用户
export const deleteBatchUsers = (data, successCb, failCb) => {
  deletes(`${scheduleBaseUrl}/api/user/deleteBatchUsers`, data, successCb, failCb);
};

// 查询单个用户
export const queryUserItem = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/user/queryUserItem`, data, successCb, failCb);
};

// 编辑用户
export const editUserItem = (data, successCb, failCb) => {
  put(`${scheduleBaseUrl}/api/user/editUserItem`, data, successCb, failCb);
};