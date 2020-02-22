import log4js from 'log4js';

log4js.configure(
  {
    appenders: {
      file: {
        type: 'file',
        filename: __dirname + '/logs/test.log',
        maxLogSize: 1024,
        compress: true,
        backups: 4,
        category: 'normal'
      },
      dateFile: {
        type: 'dateFile',
        filename: 'more-important-things.log',
        pattern: 'yyyy-MM-dd-hh',
        compress: true
      },
      out: {
        type: 'stdout'
      }
    },
    categories: {
      default: { appenders: ['file', 'dateFile', 'out'], level: 'info' }
    }
  }
);

export default (name) => {
  const logger = log4js.getLogger('normal');
  // logger.setLevel('INFO');
  return logger;
}