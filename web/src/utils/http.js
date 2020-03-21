import axios from 'axios';
import qs from 'qs';
import merge from 'lodash/merge';

// import profileConfig from '../../config/app.config';

const http = axios.create({
  timeout: 1000 * 120,               // 超时时间设置为120s
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
  },
});


// const { baseConfig, active } = profileConfig;

// const config = baseConfig[`${active}`];

// api接口请求地址
// 不再在最底层实现网络请求配置，设置为空
const baseUrl = '';

http.baseUrl = baseUrl;

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  if (actionName.indexOf('http') !== -1) {
    return actionName;
  }
  return baseUrl + actionName;
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  const defaults = {
    // 't': new Date().getTime(),
  };
  return openDefultParams ? merge(defaults, params) : params;
};

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  const defaults = {
    // 't': new Date().getTime(),
  };
  if (Array.isArray(data)) {
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data);
  }
  data = openDefultdata ? merge(defaults, data) : data;
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data);
};

export default http;

function defaultHandleSuccessCallback(data, successCb, failCb) {
  const { code = -1 } = data;
  if (code !== 0) {
    if (typeof failCb === 'function') {
      failCb({ msg: data.msg });
    }
    return;
  }
  if (typeof successCb === 'function') {
    successCb(data);
  }
}

function defaultHandleFailCallback(e, failCb) {
  if (typeof failCb === 'function') {
    failCb(e);
  }
}

/**
 * 发送post请求
 * @param url 请求url
 * @param postData body数据
 * @param successCb 成功回调
 * @param failCb 失败回调
 */
export const post = (url, postData, successCb, failCb) => {
  http({
    url: http.adornUrl(url),
    method: 'POST',
    data: http.adornData(postData),
  }).then(({ data }) => {
    defaultHandleSuccessCallback(data, successCb, failCb);
  })
    .catch(e => {
      defaultHandleFailCallback(e, failCb);
    });
};

/**
 * 发送 put 请求
 * @param url 请求url
 * @param postData body数据
 * @param successCb 成功回调
 * @param failCb 失败回调
 */
export const put = (url, postData, successCb, failCb) => {
  http({
    url: http.adornUrl(url),
    method: 'PUT',
    data: http.adornData(postData),
  }).then(({ data }) => {
    defaultHandleSuccessCallback(data, successCb, failCb);
  })
    .catch(e => {
      defaultHandleFailCallback(e, failCb);
    });
};
/**
 * 发送get请求
 * @param url 请求url
 * @param param url参数
 * @param successCb 成功回调
 * @param failCb 失败回调
 */
export const get = (url, param, successCb, failCb, axiosConfig) => {
  let aConfig = {};
  if (typeof axiosConfig !== 'undefined') {
    aConfig = axiosConfig;
  }
  http({
    url: http.adornUrl(url),
    method: 'GET',
    params: http.adornParams(param),
    ...aConfig
  }).then(( { data } ) => {
    defaultHandleSuccessCallback(data, successCb, failCb);
  })
    .catch(e => {
      defaultHandleFailCallback(e, failCb);
    });
};

/**
 * 发送delete请求
 * @param url 请求url
 * @param deleteData url参数
 * @param successCb 成功回调
 * @param failCb 失败回调
 */
export const deletes = (url, deleteData, successCb, failCb) => {
  http({
    url: http.adornUrl(url),
    method: 'DELETE',
    data: http.adornData(deleteData),
  }).then(({ data }) => {
    defaultHandleSuccessCallback(data, successCb, failCb);
  })
    .catch(e => {
      defaultHandleFailCallback(e, failCb);
    });
};
