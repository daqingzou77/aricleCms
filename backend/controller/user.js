import user from '../model/user';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import config from '../config/app.config';


// 设置图片存储路径
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, config.uploadImgDir);
  },
  filename: function(req, file, cb) {
    cb(null, `${file.originalname}`)
  }
});


var upload = multer({ storage: storage });

class users{
  constructor(app) {
    Object.assign(this, {
      app,
      user,
    })
    this.init();
  };
  
  init() {
    // **** 用户中心 ****
    this.app.post('/api/user/UploadUserAvatar', upload.array('avatar', 1), this.UploadUserAvatar.bind(this)); // 用户头像上传


    // **** 用户管理 ****
    this.app.get('/api/user/getUserList', this.getUserList.bind(this)); // 获取用户列表
    this.app.post('/api/user/getUserByOptions', this.getUserByOptions.bind(this)); // 条件查询用户
    this.app.post('/api/user/addUserParam', this.addUserParam.bind(this)); // 添加用户
    this.app.delete('/api/user/deleteUserItem', this.deleteUserItem.bind(this)); // 删除单个用户
    this.app.delete('/api/user/deleteBatchUsers', this.deleteBatchUsers.bind(this)); // 批量删除用户
    this.app.get('/api/user/queryUserItem', this.queryUserItem.bind(this)); // 查询单个用户
    this.app.put('/api/user/editUserItem', this.editUserItem.bind(this)); // 编辑单个用户

    // this.app.post('/api/user/toLogin', this.toLogin.bind(this));
    // this.app.get('/api/user/logOut', this.logOut.bind(this));
    // this.app.get('/api/user/getCaptch', this.getCaptch.bind(this));
  };
  
  UploadUserAvatar(req, res, next) {
    const files = req.files;
    const uploadImgName = files[0].originalname;
  // 设置返回结果
    try {
      if (!files[0]) {
        res.tools.setJson(0, '头像上传失败', { status: false })
      } else {
        const fileList = fs.readdirSync(config.uploadImgDir);
        if (fileList.includes(uploadImgName)){
          res.tools.setJson(0, '文件已存在', { status: false });
          return;
        }
        console.log('url', path.resolve(__dirname, files[0].path));
        res.tools.setJson(0, '头像上传成功', { url: files[0].path })
      }
    } catch (err) {
      next(err)
    }
  }

  getUserList(req, res, next) {
    this.user.find({})
    .then(doc => {
      res.tools.setJson(0, '查询成功', doc);
    })
    .catch(err => next(err));
  };

  getUserByOptions(req, res, next) {
    const { userType, name } = req.body;
    this.user.find({
      $or: [{ username: !name ? { $regex: '' } : name }, { nickname: !name ? { $regex: '' } : name }],
      userType: userType === 3 ? { $gte: 0 } : userType,
    })
    .then((doc) => {
      res.tools.setJson(0, '条件查询成功', doc);
    })
    .catch(err => next(err));
  } 

  addUserParam(req, res, next) {
    const addParam = req.body;
    const { username } = addParam;
    this.user.findOne({
      username
    })
    .then(doc => {
      if (doc) return res.tools.setJson(0 ,'用户已存在，添加失败', { status: false });
      this.user.create(addParam)
      .then(data => {
        res.tools.setJson(0, '添加成功', { status: true });
      })
    })
    .catch(err => next(err));
  };

  deleteUserItem(req, res, next) {
    const { username } = req.body;
    this.user.remove({
      username,
    })
    .then(doc => {
      if (doc.deletedCount > 0) {
        res.tools.setJson(0, '删除成功', { status: true })
      } else {
        res.tools.setJson(0, '删除失败', { status: false });
      }
    })
    .catch(err => next(err));
  };

  deleteBatchUsers(req, res, next) {
    const { deleteArrays } = req.body;
    this.user.remove({ 
      username :{ $in: deleteArrays }
    })
    .then(doc => {
      if (doc.deletedCount > 0) {
        res.tools.setJson(0, '删除成功', { status: true })
      } else {
        res.tools.setJson(0, '删除失败', { status: false });
      }
    })
    .catch(err => next(err));
  }

  queryUserItem(req, res, next) {
    const username = req.query.username;
    this.user.findOne({ username })
    .then(doc => {
      res.tools.setJson(0, '查询成功', doc);
    })
    .catch(err => next(err));
  }

  editUserItem(req, res, next) {
    const addParam = req.body;
    const { username } = addParam;
    this.user.update({ username }, { $set: addParam }) 
    .then(doc => {
      if (doc.deletedCount > 0) {
        res.tools.setJson(0, '查询成功', { status: true })
      } else {
        res.tools.setJson(0, '查询失败', { status: false });
      }
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