import { get, post } from '../utils/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 注册用户
export const userRegister = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/user/register`, data, successCb, failCb);
}

// 获取验证码
export const getCaptch = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/user/getCaptch`, data, successCb, failCb);
}

// 登录用户
export const toLogin = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/user/toLogin`, data, successCb, failCb);
}

// 退出系统
export const logOut = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/user/logOut`, data, successCb, failCb);
}