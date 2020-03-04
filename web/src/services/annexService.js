import { get, post } from '../common/http';

const scheduleBaseUrl = process.env.apiBaseUrl;

// 附件下载
export const downloadAnnex = function (url, filename) {
  const form = $('<form></form>').attr('action', url).attr('method', 'POST');
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


// 文章附件上传
export const articleAnnexUpload = (data, successCb, failCb) => {
  post(`${scheduleBaseUrl}/api/annex/articleAnnexUpload`, data, successCb, failCb);
}
  

// 获取附件上传列表
export const getAnnexRecord = (data, successCb, failCb) => {
  get(`${scheduleBaseUrl}/api/annex/getAnnexRecord`, data, successCb, failCb);
}