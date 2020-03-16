import articles from '../model/articles';
import user from '../model/user';
import chats from '../model/chat';
import async from 'async';
import moment from 'moment';

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
    this.app.get('/api/messageCenter/getCommentCounts', this.getCommentCounts.bind(this)); // 获取最新评论数
    this.app.get('/api/messageCenter/getCommentList', this.getCommentList.bind(this)); // 获取评论列表
    
    this.app.get('/api/messageCenter/getCommentStarsCounts', this.getCommentStarsCounts.bind(this)); // 获取评论点赞数
    this.app.get('/api/messageCenter/getStarCounts', this.getStarCounts.bind(this)); // 获取文章点赞数
    this.app.get('/api/messageCenter/getStarList', this.getStarList.bind(this)); // 获取点赞列表
    
    this.app.get('/api/messageCenter/getPrivateLetter', this.getPrivateLetter.bind(this)); // 获取私信
    this.app.delete('/api/messageCenter/deletePrivateItem', this.deletePrivateItem.bind(this)); // 删除私信
    this.app.get('/api/messageCenter/getFriendRequest', this.getFriendRequest.bind(this)); // 获取好友请求
    this.app.post('/api/messageCenter/solveFriendRequest', this.solveFriendRequest.bind(this)); // 处理好友请求
    this.app.get('/api/messageCenter/getUpdatesCount', this.getUpdatesCount.bind(this)); //获取最新动态个数
    this.app.get('/api/messageCenter/recordModalTime', this.recordModalTime.bind(this)); // 记录弹窗时刻
    this.app.get('/api/messageCenter/getFriendUpdates', this.getFriendUpdates.bind(this)); // 获取好友动态
  }

  getCommentCounts(req, res, next) {
    const { username } = req.query;
    this.user.findOne({ username }, { lastCloseTime: 1 }).then(data => {
      if (!data) return res.tools.setJson(0, '获取评论数失败', []);
      const { lastCloseTime } = data;
      this.articles.find({
        author: username,
        "commentList.commentTime": { $gte: new Date(lastCloseTime) }
      }, {
        commentList: 1
      }).then(datas => {
        if (datas.length === 0) return res.tools.setJson(0, '获取评论数失败', []);
        let count = 0;
        datas.map(item => {
          count += item.commentList.length;
        })
        res.tools.setJson(0, '获取评论数成功', { count });
      })
    })
    .catch(err => next(err));
  }

  getCommentList(req, res, next) {
    const { username } = req.query;
    this.articles.find({
      author: username
    }, {
      commentList: 1
    }).then(data => {
      if (data.length === 0) return res.tools.setJson(0, '获取评论失败', []);
      let respArray = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].commentList.length; j++) {
          respArray.push(data[i].commentList[j]);
        }
      }
      res.tools.setJson(0, '获取评论成功', respArray);
    })
  }

  getCommentStarsCounts(req, res, next) {

  }

  getStarCounts(req, res, next) {
     
  }

  getStarList(req, res, next) {

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

  recordModalTime(req, res, next) {
    const { username } = req.query;
    this.user.updateOne({
      username
    }, {
      $set: {
        lastCloseTime: new Date()
      }
    })
    .then(doc => {
      if (doc.nModified > 0) {
        res.tools.setJson(0, '记录时刻成功', { status: true })
      } else {
        res.tools.setJson(0, '记录时刻失败', { status: false })
      }
    })
    .catch(err => next(err));
  }

  getUpdatesCount(req, res, next) {
    const { username } = req.query;
    this.user.findOne({
      username
    }, { friendsList: 1, lastCloseTime: 1 })
    .then(doc => {
      if (doc.length === 0) return res.tools.setJson(0, '获取动态为空', { count: 0 });
        const authorArray = [];
        doc.friendsList.map(item => {
          authorArray.push(item.friend)
        })
        this.articles.find({
          author: { $in: authorArray},
          status: 3,
          passTime: { $gte: doc.lastCloseTime }
        }).countDocuments().then(data => {
          res.tools.setJson(0, '最新动态数成功', { count: data });
        })
    })
    .catch(err => next(err))
  }

  getFriendUpdates(req, res, next) {
    const { username } = req.query;
    const nowDate = new Date();
    this.user.findOne({ 
      username
    }, { friendsList: 1 })
    .then(doc => {
      if (doc.length === 0) return res.tools.setJson(0, '获取动态为空', []);
      async.map(doc.friendsList, (item, callback) => {
        this.articles.findOne({
          author: item.friend,
          status: 3,
          passTime: { $lte: nowDate }
        }, (err, data) => {
          if (err || !data) return res.tools.setJson(0, '获取动态失败', []);
          const { articlename, articleForm, articleContent, annexname, passTime } = data;
          item['articlename'] = articlename;
          item['form'] = articleForm;
          item['content'] = articleContent;
          item['annexname'] = annexname;
          item['time'] = passTime
        }).then(datas => {
          this.user.findOne({
            username: datas.author
          }, { avatar: 1 }, (err, detail) => {
            if (!detail)  return res.tools.setJson(0, '获取动态失败', []);
            item['avatar'] = detail.avatar;
            callback(null, item);
          })
        })
      }, (err, result) => {
        if (err) return res.tools.setJson(0, '获取动态失败', []);
        res.tools.setJson(0, '获取动态成功', result);
      })
    })
 
  }

}

export default MessageCenter;