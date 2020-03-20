import chats from '../model/chat';
import offline from '../model/offline';


class SocketIo {
  constructor(io) {
    Object.assign(this, {
      io,
      chats,
      offline,
      userList: []
    });
    this.init();
  }

  init() {
    //登录时建立一个username到socketId的映射表
    this.io.on('connection', socket => {
      console.log('socket已连接');
      socket.on('login', data => {
        const { username } = data;
        this.userList[username] = socket.id;
        console.log('username', this.userList);
        socket.emit('logined', { msg: `${username}已登录` })
      });

      // 发送消息
      socket.on('sendMessage', data => {
        const { sender, toFriend, time, content } = data;
        // 判断好友是否上线
        if (!this.userList[toFriend]) {
          // 好友未上线，未读消息入库
          this.offline.create(data);
          this.io.to(this.userList[sender]).emit('offlineRemind', {
            toFriend
          })
        }
        // 聊天消息内容入库
        this.chats.create(data);
        // 发给指定用户接收
        this.io.to(this.userList[toFriend]).emit('receiveMsg', {
          sender,
          toFriend,
          time,
          content
        })
      })

      // 获取历史消息
      socket.on('getHistoryMessage', data => {
        const { sender, toFriend } = data;
        const sendObj = this.userList[sender];
        // 返回过去一天内容的消息记录
        const nowDate = new Date();
        const lastDate = nowDate.setDate(nowDate.getDate() - 1);
        this.chats.find({
          $and: [
            { sender: { $in: [sender, toFriend] } },
            { toFriend: { $in: [sender, toFriend] } }
          ],
          time: { $gt: lastDate }
        }).then(doc => {
          // 推送指定用户
          this.io.to(sendObj).emit('pushHistoryMessage', doc);
        })
      });

      // 用户退出，清空用户对应socket
      socket.on('logout', data => {
        const { username } = data;
        this.userList[username] = null;
      })
    })
  }
}

export default SocketIo;
