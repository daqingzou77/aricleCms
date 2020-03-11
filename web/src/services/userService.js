import { get, post, deletes, put } from '../common/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// **** 用户中心 ****

// 更新用户信息
export const updateUserDetail = (data, successCb, failCb) => {
  put(`${scheduleBaseUrl}/api/user/updateUserDetail`, data, successCb, failCb);
}

// 获取当前用户详细信息
export const getCurrentUserDetail = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/user/getCurrentUserDetail`, data, successCb, failCb);
}

// 查询好友
export const getFriendsDetail = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/user/getFriendsDetail`, data, successCb, failCb);
}

// 发送好友请求
export const addUserRequest = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/user/addUserRequest`, data, successCb, failCb);
} 

// 获取好友、关注、拉黑列表
export const getClassifiedList = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/user/getClassifiedList`, data, successCb, failCb);
}











// **** 用户管理 ****

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


