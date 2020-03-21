import { get, post, deletes } from '../utils/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 附件下载
export const downloadAnnex = function (filename) {
  const form = $('<form></form>').attr('action', `${scheduleBaseUrl}/api/annex/downloadAnnex`).attr('method', 'POST');
  form.append(
    $('<input/>')
      .attr('type', 'hidden')
      .attr('name', 'filename')
      .attr('value', filename)
  );

  form
    .appendTo('body')
    .submit()
    .remove();
};

// 删除上传文档
export const removeAnnex = (data, successCb, failCb) => {
  deletes(`${scheduleBaseUrl}/api/annex/removeAnnex`, data, successCb, failCb);
}

// 文章附件上传
export const articleAnnexUpload = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/annex/articleAnnexUpload`, data, successCb, failCb);
}
  

// 获取附件上传列表
export const getAnnexRecord = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/annex/getAnnexRecord`, data, successCb, failCb);
}