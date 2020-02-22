import axios from 'axios';
import qs from 'qs';
import merge from 'lodash/merge';

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// api接口请求地址
const baseUrl = process.env.apiBaseUrl;

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = actionName => {
  return baseUrl + actionName;
};

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  let defaults = {
    t: new Date().getTime(),
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
  let defaults = {
    t: new Date().getTime(),
  };
  data = openDefultdata ? merge(defaults, data) : data;
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data);
};

export default http;
