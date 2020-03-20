import log4js from 'log4js';
import path from 'path';

// 配置文档输出日志
log4js.configure(
  {
    appenders: { // 指定日志输出位置
      file: {
        type: 'file',
        filename: path.resolve(__dirname, '../logs/test.log'),
        maxLogSize: 1024,
        compress: true,
        backups: 4,
        category: 'normal'
      },
      // dateFile: {
      //   type: 'dateFile',
      //   filename: 'more-important-things.log',
      //   pattern: 'yyyy-MM-dd-hh',
      //   compress: true
      // },
      out: {
        type: 'stdout'
      }
    },
    categories: { // 分区
      default: { appenders: ['file', 'out'], level: 'info' }
    }
  }
);

export default (name) => {
  const logger = log4js.getLogger(name);
  return logger;
}