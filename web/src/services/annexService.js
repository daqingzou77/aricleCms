import { get, post } from '../common/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 附件上传
export const annexUpload = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/annex/annexUpload`, data, successCb, failCb);
}

// 附件下载
export const downloadAnnex = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/annex/downloadAnnex`, data, successCb, failCb);
}

// 文章附件上传
export const articleAnnexUpload = (data, successCb, failCb) => {
    post(`${scheduleBaseUrl}/api/annex/articleAnnexUpload`, data, successCb, failCb);
  }

// 获取附件上传列表
export const getAnnexRecord = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/annex/getAnnexRecord`, data, successCb, failCb);
}