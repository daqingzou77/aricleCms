import moment from "moment"


const { APP_TYPE} = process.env;
const BUILD_VERSION=`1.0.0.190821${moment(new Date()).format('YYMMDD')}.${moment(new Date()).format('hhmm')}`


export default {
  // 定义的变量，在代码中可以通过相应key读取。
  define: {
    'process.env.ENV':'prod',
    APP_TYPE: APP_TYPE || '',
    // 下方为axios请求基地址
    'process.env.apiBaseUrl':'/api/LK-0200024/LK024',
    // prod环境添加BUILD_VERSION，取值如上
    'process.env.BUILD_VERSION':BUILD_VERSION,
  },
  manifest: {
    basePath: `/LK-0200024/`,
  },
  publicPath: `/LK-0200024/`,
  base: `/LK-0200024/`,
};
