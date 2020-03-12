import express from 'express';
import mongoDb from './db/mongo';
const server = require('http').Server(app);
const io = require('socket.io')(server);
import log4js from 'log4js';
import logger from './utils/logger';
import bodyParse from 'body-parser';
import cookieParse from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import connect from 'connect';
import sessionMongoose from 'session-mongoose'; 
import fileStore from 'session-file-store';
import tools from './middlewares/tools';
import routes from './routes/index';
import config from './config/app.config';

// const fileStores = fileStore(sessionMongoose);
const mongDB = new mongoDb();
const app = express();
// const sessionStore = sessionMongoose(connect);
// const store = new sessionStore({url: config.mongo.sessionUrl});


// app.use(log4js.connectLogger(logger('normal'), {level:'auto', format: ':method :url :status'}));  //日志

app.use(bodyParse.json()); // 解析url信息中的参数
app.use(bodyParse.urlencoded({ extended: false }));
app.use(cookieParse(config.secret)); //解析签名cookie
app.use(cors());  // 响应带cookie的跨域请求


// 设置session
app.use(session({
  //store: fileStores, // 存储的实例，可用mongodb和redis实现
  cookie: {
    maxAge: 10*60*1000 // session的有效时间
  },
  resave: false, // 是否允许session重新设置，为true时保证session有操作
  saveUninitialized: false, // 是否保存未初始化的会话
  secret: config.secret // 注册session id到cookie中，相当于一个密钥
}))


app.use(/\/api/, tools);
app.use(/\/api/, express.static('public'));

// app.use(/\/api/, (req, res, next) => {
//   console.log(req.session.userName);
//   if (req.session.userName || req.path.indexOf('/user/toLogin') !== -1 || req.path.indexOf('/user/getCaptch') !== -1 ) {
//     next();
//   } else {
//     res.tools.setJson(503, '无访问权限', []);
//   }
// });

// socketio 处理
io.on('connection', (socket) => {
  // 当前用户登录
  socket.on('login', (data) => {

  });
  // 发送消息
  socket.on('sendMesage', (data) => {
    socket.to(data.id).emit('receiveMsg', data) // 接收消息
  })
})

routes(app);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  err.message = '系统未发现'
  next(err);
});

app.use((err, req, res, next) => {
  res.send({
    status: err.status || 500, 
    message: err.message || '发生错误'
  });
});

export default app;