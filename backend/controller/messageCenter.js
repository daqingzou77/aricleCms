import articles from '../model/articles';
import users from '../model/user';
import chats from '../model/chat';

class MessageCenter {
  constructor(app) {
    Object.assign(this, {
      app,
      articles,
      users,
      chats
    });
    this.init();
  }

  init(){
    this.app.get('/api/messageCenter/getFriendRequest', this.getFriendRequest.bind(this)); // 获取好友请求
    this.app.post('/api/messageCenter/solveFriendRequest', this.solveFriendRequest.bind(this)); // 处理好友请求
  }

  getFriendRequest(req, res, next) {
    const { username } = req.query;
    this.users.findOne({
      username
    }, { requestList: 1})
    .then(doc => {
      res.tool.setJson(0, '获取好友列表成功', doc);
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
          if (next.nModified === 0) return  res.tools.setJson(0, '同意好友失败', { status: 3 });
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
                  res.tools.setJson(0, '同意好友成功', { status: 1 });
                } else {
                  res.tools.setJson(0, '同意好友失败', { status: 3 });
                }
              })
            } else {
              res.tools.setJson(0, '同意好友失败', { status: 3 });
            }
          })
        })
      } else {
        res.tools.setJson(0, '拒绝好友', { status: 2 })
      }
    })
    .catch(err => next(err));
  }

}

export default MessageCenter;