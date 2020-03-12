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
        socket.emit('logined', { msg: `${username}已登录`})
      });
  
      socket.on('sendMessage', data => {
        const { sender, toFriend, content } = data;
        console.log('data', data);
        this.io.to(this.userList[toFriend]).emit('receiveMsg', {
          message: '消息收到'
        })

          // Idtoid.findOne({
          //     username: data.to_user
          // }).then((rs) => {
          // //根据用户名在映射表中找到对应的socketId
          //     io.to(rs.socketid).emit('receiveMsg',{
          //         from_user:data.from_user,
          //         message:data.message,
          //         time:data.time,
          //         avater:data.avater,
          //         _id:data._id
          //     })
          // })
      })
    })
  }
}

export default SocketIo;
