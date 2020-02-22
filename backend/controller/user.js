import user from '../model/user';
import moment from 'moment';
import { getRandomNumbers } from '../utils/index';
class users{
  constructor(app) {
    Object.assign(this, {
      app,
      user,
    })
    this.init();
  };
  
  init() {
    this.app.get('/api/user/getUserList', this.getUserList.bind(this));
    this.app.post('/api/user/addUserParam', this.addUserParam.bind(this));
    this.app.delete('/api/user/deleteOneUser', this.deleteOneUser.bind(this));
    this.app.put('/api/user/updateUser', this.updateUser.bind(this));
    this.app.get('/api/user/findUserByItem', this.findUserByItem.bind(this));
    this.app.post('/api/user/toLogin', this.toLogin.bind(this));
    this.app.get('/api/user/logOut', this.logOut.bind(this));
    this.app.get('/api/user/getCaptch', this.getCaptch.bind(this));
  };

  getUserList(req, res, next) {
    this.user.find({})
    .then(doc => {
      res.tools.setJson(0, '查询成功', doc);
    })
    .catch(err => next(err));
  };

  addUserParam(req, res, next) {
    const addParam = req.body;
    console.log(addParam);
    addParam.createTime = moment(new Date).format('YYYY-MM-DD hh:mm:ss') 
    this.user.create(addParam)
    .then(doc => {
      res.tools.setJson(0, '添加成功', doc);
    })
    .catch(err => next(err));
  };
  
  deleteOneUser(req, res, next) {
    const { userName } = req.body;
    this.user.remove({
      userName,
    })
    .then(doc => {
      res.tools.setJson(0, '删除成功', doc);
    })
    .catch(err => next(err));
  };

  updateUser(req, res, next) {
    const { userName, password, note, userType } = req.body;
    const createTime = new Date()
    this.user.update({ userName },{
      password,
      note,
      createTime,
      userType,
    }) 
    .then(doc => {
      res.tools.setJson(0, '修改成功', doc);
    })
    .catch(err => next(err));
  };

  findUserByItem(req, res, next) {
    const userName = req.query.userName;
    this.user.findOne({ userName })
    .then(doc => {
      res.tools.setJson(0, '查询成功', doc);
    })
    .catch(err => next(err));
  }

  // 1：无此人记录 2： 账号密码错误 3：验证码错误 0：登录成功
  toLogin(req, res, next) {
    const { userName, password, captcha } = req.body;
    const currentCaptch = req.session.captch;
    console.log('captcha', captcha);
    console.log('currentCaptch', currentCaptch);
    this.user.findOne({ userName })
    .then(doc => {
      if(doc !== null) {
        const { password: passwd } = doc;
        if (passwd !== password) {
          res.tools.setJson(1, '账户密码错误', 2);
          return;
        } else {
          if (currentCaptch !== captcha) {
            res.tools.setJson(1, '验证码输入错误', 3);
            return;
          } else {
            req.session.userName = userName;
            res.tools.setJson(0, '登录成功', 4);
          }
        }
      }else{
        res.tools.setJson(1, '当前用户不存在', 1);
      }
    })
    .catch(err => next(err));
  }

  getCaptch(req, res, next) {
    const randomCaptch = getRandomNumbers();
    req.session.captch = randomCaptch;
    res.tools.setJson(0, '获取验证码成功', randomCaptch);
  }

  logOut(req, res, next) {
    req.session.userName = null;
    req.session.captch = null;
    res.tools.setJson(0, '退出成功', 1);
  }

}

export default users;