import React from 'react';
import Message from './Message';
import Send from './Send';
import styles from './style.less'

class Chat extends React.Component {
  render() {
    return (
      <div className={styles.chatmain}>
        <Message />
        <Send />
      </div>
    )
  }
}

export default Chat