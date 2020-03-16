import articles from '../model/articles';
import user from '../model/user';
import chats from '../model/chat';
import async from 'async';

class MessageCenter {
  constructor(app) {
    Object.assign(this, {
      app,
      articles,
      user,
      chats
    });
    this.init();
  }

  init(){
    this.app.get('/api/messageCenter/getPrivateLetter', this.getPrivateLetter.bind(this)); // 获取私信
    this.app.delete('/api/messageCenter/deletePrivateItem', this.deletePrivateItem.bind(this)); // 删除私信
    this.app.get('/api/messageCenter/getFriendRequest', this.getFriendRequest.bind(this)); // 获取好友请求
    this.app.post('/api/messageCenter/solveFriendRequest', this.solveFriendRequest.bind(this)); // 处理好友请求
  }

  getPrivateLetter(req, res, next) {
    const { username } = req.query;
    this.user.findOne({
      username,
    }, { messageList: 1 })
    .then(doc => {
      if (!doc) return res.tools.setJson(0, '获取私信失败', []);
      async.map(doc.messageList, (item, callback) => {
        this.user.findOne({ username: item.replyer }, (err, data) => {
          if (!data) return res.tools.setJson(0, '信息获取失败', []);
          item['replyer'] = item.replyer;
          item['avatar'] = data.avatar;
          callback(null, item)
        })
      }, (err, result) => {
        if (err) return res.tools.setJson(0, '信息获取失败', [])
        res.tools.setJson(0, '获取私信成功', result);
      })
    })
    .catch(err => next(err));
  }

  deletePrivateItem(req, res, next) {
    const { username, targetUser, time } = req.body;
    this.user.updateOne({
      username
    }, {
      $pull: { messageList: { replyer: targetUser, time: new Date(time) } }
    })
    .then(doc => {
      if (doc.nModified > 0) {
        res.tools.setJson(0, '删除私信成功', { status: true });
      } else {
        res.tools.setJson(0, '删除私信失败', { status: false });
      }
    })
    .catch(err => next(err));
  }

  getFriendRequest(req, res, next) {
    const { username } = req.query;
    this.user.findOne({
      username
    }, { requestList: 1})
    .then(data => {
      async.map(data.requestList, (item, callback) => {
        this.user.findOne({ username: item.requester }, (err, doc) => {
          if (err) return res.tools.setJson(0, '信息获取失败', err)
          item['name'] = item.requester;
          item['avatar'] = doc.avatar;
          callback(null, item);
        })
      }, (err, result) => {
        if (err) return res.tools.setJson(0, '信息获取失败', err)
        res.tools.setJson(0, '好友列表获取成功', result)
      })
    })
    .catch(err => next(err))
  }

  solveFriendRequest(req, res, next) {
    const { requester, targetUser, key } = req.body;
    this.user.findOne({ username: targetUser, 'friendsList.friend': requester }).then(doc =>{
      if (doc) {
        res.tools.setJson(0, '好友已存在', { status: 0 });
        return;
      }
      // 同意好友请求
      if (key == 1) {
        this.user.updateOne({ username: requester}, {
          $push: {
            friendsList: { friend: targetUser }
          }
        }).then(next => {
          if (next.nModified === 0) return  res.tools.setJson(0, '同意好友失败', { status: false });
          this.user.updateOne({ username: targetUser }, {
            $push: {
              friendsList: { friend: requester },
            }
          }).then(data => {
            if (data.nModified > 0) {
              this.user.updateOne({
                username: targetUser
              }, {
                $pull: { requestList: { requester } }
              })
              .then(doc => {
                if (doc.nModified > 0) {
                  res.tools.setJson(0, '同意好友成功', { status: true });
                } else {
                  res.tools.setJson(0, '同意好友失败', { status: false });
                }
              })
            } else {
              res.tools.setJson(0, '同意好友失败', { status: false });
            }
          })
        })
      } else {
        this.user.updateOne({
          username: targetUser
        }, {
          $pull: { requestList: { requester } }
        }).then(doc => {
          if (doc.nModified > 0) {
            res.tools.setJson(0, '拒绝好友成功', { status: true })
          } else {
            res.tools.setJson(0, '拒绝好友失败', { status: false })
          }
        })
      }
    })
    .catch(err => next(err));
  }

}

export default MessageCenter;