import React from 'react';
import { message } from 'antd';
import Message from './Message';
import Send from './Send';
import styles from './style.less'

class Chat extends React.Component {

  state = {
    dialogTips: []
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const { socket, username } = this.props;
    socket.emit('login', { username });
    socket.on('logined', data => {
      console.log('logined', data.msg);
    })
    socket.on('userOut', data => {
      console.log('userOut', data.msg);
    })
  };

  setContent = content => {
    const { setContent } = this.props;
    setContent(content);
  }

  render() {
    const { content } = this.props;
    const { dialogTips } = this.state;
    return (
      <div className={styles.chatmain}>
        <Message dialogTips={dialogTips} />
        <Send setContent={this.setContent} content={content} />
      </div>
    )
  }
}

export default Chat