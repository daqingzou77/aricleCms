import chats from '../model/chat';
import users from '../model/user';

class SocketIo {
  constructor(io) {
    Object.assign(this, {
      io,
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
        console.log('userList', this.userList);
        socket.emit('logined', { msg: `${username}已登录`})
      });
  
    socket.on('sendMessage', data => {
      const { sender, toFriend, time, content } = data;
      console.log('data', data);
      this.io.to(this.userList[toFriend]).emit('receiveMsg', {
        sender,
        toFriend,
        time,
        content
      })

    socket.on('getMessage', data => {
      // 数据库获取数据，并返回
      socket.emit('pushMessage', data);
    })
      })
    })
  }
}

export default SocketIo;
