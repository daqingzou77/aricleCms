import React from 'react';
import Message from './Message';
import Send from './Send';
import styles from './style.less'

class Chat extends React.Component {

  setContent = content => {
    const { setContent } = this.props;
    setContent(content);
  }

  render() {
    const { content, dialogTips } = this.props;
    return (
      <div className={styles.chatmain}>
        <Message dialogTips={dialogTips} />
        <Send setContent={this.setContent} content={content} />
      </div>
    )
  }
}

export default Chat