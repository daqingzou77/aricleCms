import React from 'react';
import SocketIo from 'socket.io-client';
import Message from './Message';
import Send from './Send';
import styles from './style.less'
import { message } from 'antd';

class Chat extends React.Component {

  componentDidMount() {
    this.initSocketIo();
  }

  initSocketIo = userId => {
    // const hostPort = '9999';
    // let socketHostName = window.location.hostname;
    // if (process.env.ENV === 'dev') {
    //   socketHostName = process.env.apiBaseUrl.slice(0, process.env.apiBaseUrl.lastIndexOf(':'));
    // }
    this.socket = SocketIo.connect('http://localhost:80');
    this.socket.emit('login', { username: '古天乐'});
    this.socket.on('logined', data => {
      message.success(data.msg);
    })
    this.socket.on('connect', () => {
      console.log('socket connected');
    });
    this.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
    this.socket.on('receiveMsg', data => {
      message.success(data);
    })
  };

  handlePushMessage = content => {
    this.props.handlePushMessage(this.socket, content);
  }

  render() {
    return (
      <div className={styles.chatmain}>
        <Message />
        <Send handlePushMessage={this.handlePushMessage} />
      </div>
    )
  }
}

export default Chat