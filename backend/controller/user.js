
import multer from 'multer';
import fs from 'fs';
import async from 'async';
import user from '../model/user';
import chat from '../model/chat';
import config from '../config/app.config';
import Tool from '../utils/tools';

const Tools = new Tool();
// import { getRandomNumbers } from '../utils/index';

// 设置图片存储路径
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadImgDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`)
  }
});


var upload = multer({ storage: storage });

class users {
  constructor(app) {
    Object.assign(this, {
      app,
      user,
      chat
    })
    this.init();
  };


  init() {
    // 个人中心
    this.app.post('/api/user/uploadUserAvatar', upload.array('avatar', 1), this.uploadUserAvatar.bind(this)); // 用户头像上传
    this.app.put('/api/user/updateUserDetail', this.updateUserDetail.bind(this)); // 更新用户详细信息
    this.app.get('/api/user/getCurrentUserDetail', this.getCurrentUserDetail.bind(this)); // 获取当前用户信息
    this.app.get('/api/user/getFriendsDetail', this.getFriendsDetail.bind(this)); // 查询好友信息
    this.app.get('/api/user/addUserRequest', this.addUserRequest.bind(this)); // 好友请求
    this.app.get('/api/user/getClassifiedList', this.getClassifiedList.bind(this)); // 获取分类好友信息
    this.app.post('/api/user/checkStatus', this.checkStatus.bind(this)); // 检查通信状态
    this.app.post('/api/user/solveBlack', this.solveBlack.bind(this)); // 处理好友拉黑
    this.app.delete('/api/user/deleteFriend', this.deleteFriend.bind(this)); // 删除好友
    this.app.get('/api/user/deleteAllChats', this.deleteAllChats.bind(this)); // 删除所有用户的消息记录

    // 用户管理
    this.app.get('/api/user/getUserList', this.getUserList.bind(this)); // 获取用户列表
    this.app.post('/api/user/getUserByOptions', this.getUserByOptions.bind(this)); // 条件查询用户
    this.app.post('/api/user/addUserParam', this.addUserParam.bind(this)); // 添加用户
    this.app.delete('/api/user/deleteUserItem', this.deleteUserItem.bind(this)); // 删除单个用户
    this.app.delete('/api/user/deleteBatchUsers', this.deleteBatchUsers.bind(this)); // 批量删除用户
    this.app.get('/api/user/queryUserItem', this.queryUserItem.bind(this)); // 查询单个用户
    this.app.put('/api/user/editUserItem', this.editUserItem.bind(this)); // 编辑单个用户

    // 系统登录、注册、验证码功能
    this.app.post('/api/user/register', this.registerUser.bind(this));
    this.app.post('/api/user/toLogin', this.toLogin.bind(this));
    this.app.get('/api/user/logOut', this.logOut.bind(this));
    this.app.get('/api/user/getCaptch', this.getCaptch.bind(this));
  };

  uploadUserAvatar(req, res, next) {
    const files = req.files;
    const uploadImgName = files[0].originalname;
    // 设置返回结果
    try {
      if (!files[0]) {
        res.tools.setJson(0, '头像上传失败', { status: false })
      } else {
        const fileList = fs.readdirSync(config.uploadImgDir);
        if (fileList.includes(uploadImgName)) {
          res.tools.setJson(0, '头像已存在', { url: files[0].path })
          return;
        }
        res.tools.setJson(0, '头像上传成功', { url: files[0].path })
      }
    } catch (err) {
      next(err)
    }
  }

  updateUserDetail(req, res, err) {
    const upateParam = req.body;
    const { username } = upateParam;
    this.user.findOne({
      username
    })
      .then(data => {
        if (!data) {
          res.tools.setJson(0, '用户详细更新失败', { status: false });
          return;
        }
        this.user.updateOne({ username }, { $set: upateParam })
          .then(doc => {
            if (doc.nModified > 0) {
              res.tools.setJson(0, '更新成功', { status: true })
            } else {
              res.tools.setJson(0, '更新失败', { status: false })
            }
          }
          )
      })
      .catch(err => next(err))
  }

  getCurrentUserDetail(req, res, next) {
    const { username } = req.query;
    this.user.findOne({ username })
      .then(data => {
        if (!data) return res.tools.setJson(0, '无此人信息', {});
        res.tools.setJson(0, '获取信息成功', data);
      })
      .catch(err => next(err));
  }

  getFriendsDetail(req, res, next) {
    const field = req.query.field;
    this.user.find({
      $or: [{
        username: { $regex: field }
      }, {
        nickname: { $regex: field }
      }]
    }).then(data => {
      res.tools.setJson(0, '查询成功', data);
    })
      .catch(err => next(err))
  }

  addUserRequest(req, res, next) {
    const { requester, targetUser } = req.query;
    this.user.findOne({
      username: requester,
      "friendsList.friend": targetUser
    }).then(data => {
      if (data) return res.tools.setJson(0, '好友已添加', { status: 0 })
      this.user.findOne({
        username: targetUser, "requestList.requester": requester
      })
     .then(doc => {
       if (doc) {
         return res.tools.setJson(0, '请求已发送，不能再次发送', { status: 1 })
       }
       this.user.updateOne({ username: targetUser }, {
         $push: {
           requestList: { requester },
         }
       }).then(data => {
         if (data.nModified > 0) {
           res.tools.setJson(0, '请求发送成功', { status: 2 });
         } else {
           res.tools.setJson(0, '请求发送失败', { status: 3 })
         }
       })
     })
    })
    .catch(err => next(err));
  }

  getClassifiedList(req, res, next) {
    const { username, key } = req.query;
    const option = {};
    switch (key) {
      case '0': option.friendsList = 1; break; // 获取好友列表 
      case '1': option.blacklist = 1; break; // 获取拉黑列表
    }
    this.user.findOne({ username }, option)
      .then(data => {
        if (key == 0) {
          async.map(data.friendsList, (item, callback) => {
            this.user.findOne({ username: item.friend }, (err, doc) => {
              if (err) return res.tools.setJson(0, '信息获取失败', err)
              item['name'] = item.friend;
              item['avatar'] = doc.avatar;
              callback(null, item);
            })
          }, (err, results) => {
            if (err) return res.tools.setJson(0, '信息获取失败', err)
            res.tools.setJson(0, '好友列表获取成功', results)
          })
        } else {
          async.map(data.blacklist, (item, callback) => {
            this.user.findOne({ username: item.black }, (err, doc) => {
              if (err) return res.tools.setJson(0, '信息获取失败', err)
              item['name'] = item.black;
              item['avatar'] = doc.avatar;
              callback(null, item);
            })
          }, (err, result) => {
            if (err) return res.tools.setJson(0, '信息获取失败', err)
            res.tools.setJson(0, '拉黑列表获取成功', result)
          })
        }
      })
      .catch(err => next(err));
  }

  checkStatus(req, res, next) {
    const { username, targetUser } = req.body;
    this.user.findOne({ username: targetUser }, {
      friendsList: 1,
      blacklist: 1
    }).then(doc => {
      console.log(doc);
      const { friendsList, blacklist } = doc;
      for (let i = 0; i < friendsList.length; i++) {
        if (friendsList[i].friend === username) {
          return res.tools.setJson(0, '可以通讯', { status: 2 })
        }
      }
      for (let j = 0; j < blacklist.length; j++) {
        if (blacklist[j].black === username) {
          return res.tools.setJson(0, '已拉黑', { status: 1 })
        }
      }
      return res.tools.setJson(0, '已删除', { status: 0 })
    })
      .catch(err => next(err));
  }

  solveBlack(req, res, next) {
    const { username, targetUser, key } = req.body;
    const pullOption = {};
    const pushOption = {};
    if (key === 1) {
      pullOption['friendsList'] = { friend: targetUser };
      pushOption['blacklist'] = { black: targetUser };
    } else if (key === 2) {
      pullOption['blacklist'] = { black: targetUser };
      pushOption['friendsList'] = { friend: targetUser };
    }
    this.user.updateOne({
      username
    }, {
      $pull: pullOption,
      $push: pushOption
    }).then(doc => {
      if (doc.nModified > 0) {
        console.log(doc)
        res.tools.setJson(0, '好友拉黑成功', { status: true })
      } else {
        res.tools.setJson(0, '好友拉黑失败', { status: false })
      }
    })
      .catch(err => next(err));
  }

  deleteFriend(req, res, next) {
    const { username, targetUser } = req.body;
    this.user.updateOne({
      username
    }, {
      $pull: { friendsList: { friend: targetUser } }
    })
      .then(doc => {
        if (doc.nModified > 0) {
          this.chat.remove({
            $or: [{ sender: { $in: [username, targetUser] }, toFriend: { $in: [username, targetUser] } }]
          }).then(() => {
            res.tools.setJson(0, '好友删除成功', { status: true })
          })
        } else {
          res.tools.setJson(0, '好友删除失败', { status: false })
        }
      })
      .catch(err => next(err))
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
        if (doc) return res.tools.setJson(0, '用户已存在，添加失败', { status: false });
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
      username: { $in: deleteArrays }
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
    const editParam = req.body;
    const { username } = addParam;
    this.user.update({ username }, { $set: editParam })
      .then(doc => {
        if (doc.nModified > 0) {
          res.tools.setJson(0, '修改成功', { status: true })
        } else {
          res.tools.setJson(0, '修改失败', { status: false });
        }
      })
      .catch(err => next(err));
  }

  registerUser(req, res, next) {
    const addParam = req.body;
    const { username } = addParam;
    this.user.findOne({ username })
      .then(doc => {
        if (doc) return res.tools.setJson(0, '当前注册用户已存在', { status: false });
        this.user.create(addParam)
          .then(data => {
            res.tools.setJson(0, '注册成功', { status: true });
          })
      })
      .catch(err => next(err));
  }

  // 1：无此人记录 2： 账号密码错误 3：验证码错误 0：登录成功
  toLogin(req, res, next) {
    const { username, password, captcha } = req.body;
    const currentCaptch = req.session.captch;
    this.user.findOne({ username })
      .then(doc => {
        const { userType } = doc;
        if (doc !== null) {
          if (doc.password !== password) {
            res.tools.setJson(0, '账户密码错误', { status: 2 });
            return;
          } else {
            if (currentCaptch !== captcha) {
              res.tools.setJson(0, '验证码输入错误', { status: 3 });
              return;
            } else {
              req.session.username = username;
              res.tools.setJson(0, '登录成功', { status: 4, username, userType });
            }
          }
        } else {
          res.tools.setJson(0, '当前用户不存在', { status: 1 });
        }
      })
      .catch(err => next(err));
  }

  getCaptch(req, res, next) {
    const randomCaptch = Tools.getRandomNumbers();
    req.session.captch = randomCaptch;
    res.tools.setJson(0, '获取验证码成功', randomCaptch);
  }

  logOut(req, res, next) {
    req.session.username = null;
    req.session.captch = null;
    res.tools.setJson(0, '退出成功', 1);
  }

  deleteAllChats(req, res, next) {
    this.chat.remove({})
      .then(data => {
        res.tools.setJson(0, '删除成功', 'success')
      })
  }

}

export default users;