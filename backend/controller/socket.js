import chats from '../model/chat';

class SocketIo {
  constructor(io) {
    Object.assign(this, {
      io,
      chats,
      userList: []   
    });
    this.init();  
  }

  init() {
    //登录时建立一个username到socketId的映射表
    this.io.on('connection', socket => {
      console.log('socket已连接');
      socket.on('login', data  => {
        const { username } = data;
        this.userList[username] = socket.id;
        console.log('username', this.userList);
        socket.emit('logined', { msg: `${username}已登录`})
      });
  
      socket.on('sendMessage', data => {
        const { sender, toFriend, time, content } = data;
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
        // 数据库获取数据，并返回
        const nowDate = new Date();
        const lastDate = nowDate.setDate(nowDate.getDate()-1);
        this.chats.find({
          $and: [
            { sender: { $in: [ sender, toFriend ] } }, 
            { toFriend: { $in: [sender, toFriend ] } }
          ],
          time: { $gt: lastDate}
        }).then(doc => {
          socket.emit('pushHistoryMessage', doc);
        })
      });

      socket.on('logout', data => {
        const { username } = data;
        // 清空数据
        this.userList[username] = null;
        console.log(this.userList);
        socket.emit('userOut',{ msg: `${username}已退出` })
      })
    })
  }
}

export default SocketIo;
