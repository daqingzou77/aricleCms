import http from '../common/http';

// 修改baseUrl, 最小化模块组件迁移的改动
// 需要修改请求的baseUrl：
// const locationBaseUrl = 'the baseUrl of your server'
const scheduleBaseUrl = process.env.apiBaseUrl;

const $http = function(config) {
  const url = `${scheduleBaseUrl}/${config.url}`;
  return http({
    ...config,
    url,
  });
};

$http.adornData = http.adornData;
$http.adornUrl = http.adornUrl;
$http.adornParams = http.adornParams;

export default $http;
