import React from 'react';
import Message from './Message';
import Send from './Send';
import styles from './style.less'
import { message } from 'antd';

class Chat extends React.Component {

  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    const { socket, username } = this.props;
    socket.emit('login', { username });
    socket.on('logined', data => {
      message.success(data.msg);
    })
    socket.on('receiveMsg', data => {
      message.success(data.content);
    })
  };

  setContent = content => {
    const { setContent } = this.props;
    setContent(content);
  }

  render() {
    return (
      <div className={styles.chatmain}>
        <Message />
        <Send setContent={this.setContent} />
      </div>
    )
  }
}

export default Chat