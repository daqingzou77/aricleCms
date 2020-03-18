import chats from '../model/chat';
import offlineMessage from '../model/offlineMessaeg';

class SocketIo {
  constructor(io) {
    Object.assign(this, {
      io,
      chats,
      offlineMessage,
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

      socket.on('sendMessage', data => {
        const { sender, toFriend, time, content } = data;
        // 判断好友是否上线
        if (!this.userList[toFriend]) {
         // 好友未上线，消息入库
         this.offlineMessage.create(data);
         this.io.to(this.userList[sender]).emit('offlineRemind', {
           toFriend
         })
        }
        this.chats.create(data);
        // 发给指定用户
        this.io.to(this.userList[toFriend]).emit('receiveMsg', {
          sender,
          toFriend,
          time,
          content
        })
      })

      socket.on('getHistoryMessage', data => {
        const { sender, toFriend } = data;
        const sendObj = this.userList[sender];
        // 数据库获取数据，并返回
        const nowDate = new Date();
        const lastDate = nowDate.setDate(nowDate.getDate() - 1);
        this.chats.find({
          $and: [
            { sender: { $in: [sender, toFriend] } },
            { toFriend: { $in: [sender, toFriend] } }
          ],
          time: { $gt: lastDate }
        }).then(doc => {
          this.io.to(sendObj).emit('pushHistoryMessage', doc);
        })
      });

      socket.on('logout', data => {
        // 清空数据
        const { username } = data;
        this.userList[username] = null;
        console.log(`${username} logout`);
      })
    })
  }
}

export default SocketIo;
