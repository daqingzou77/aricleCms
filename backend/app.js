import express from 'express';
import mongoDb from './db/mongo';
import log4js from 'log4js';
import logger from './utils/logger';
import bodyParse from 'body-parser';
import cookieParse from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import tools from './middlewares/tools';
import routes from './routes/index';
import config from './config/app.config';

var server = require('http').Server(app);
var io = require('socket.io')(server);
// websocket监听服务 80 端口
server.listen(80, () => {
  console.log('-----websocket listening on port '+80+'-----')
});

// 实例化mongoDB
const mongDB = new mongoDb();
const app = express();

app.use(log4js.connectLogger(logger('normal'), { level:'auto', format: ':method :url :status' }));  //日志
app.use(express.static('public'));
app.use(bodyParse.json()); // 解析url信息中的参数
app.use(bodyParse.urlencoded({ extended: false }));
app.use(cookieParse(config.secret)); //解析签名cookie
app.use(cors({'credentials': true, origin: 'http://localhost:9007'})); // 设置跨域并允许请求中携带cookie


// 设置session
app.use(session({
  secret: config.secret, // 对session cookie进行签名
  cookie: {
    maxAge: 10*60*1000 // session的有效时间
  },
  resave: true, // 是否允许session重新设置，为true时保证session有操作
  saveUninitialized: false, // 是否保存未初始化的会话
  secret: config.secret // 注册session id到cookie中，相当于一个密钥
}))

// 工具类设置
app.use(/\/api/, tools);

// 权限设置
app.use(/\/api/, (req, res, next) => {
  if (req.session.username || req.path.indexOf('/user/toLogin') !== -1 || req.path.indexOf('/user/getCaptch') !== -1 ) {
    next();
  } else {
    res.tools.setJson(503, '无访问权限', []);
  }
});

// 路由匹配
routes(app, io);

// 异常处理
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = '系统未发现'
  next(err);
});

app.use((err, res) => {
  res.send({
    status: err.status || 500, 
    message: err || '发生错误'
  });
});

export default app;