import React from 'react';
import { Avatar } from 'antd';
import InfiniteSrcoll from 'react-infinite-scroller';
import styles from './style.less'

class Message extends React.Component {

  render() {
   const { dialogTips } = this.props;
    const messageTips = dialogTips.map((item, index, arr) => (
      <div className={styles.mainDiv}>
        <div style={{ textAlign: 'center'}}>{ index === 0 ? item.logtime.format('hh:mm:ss') : item.logtime.second() - arr[index-1].logtime.second() > 5 ? item.logtime.format('hh:mm:ss') : null}</div>
        <div style={{ display: item.senderContent === '' ? 'none': 'flex', flexDirection: 'row' }}>
          <Avatar icon="user" style={{ color: 'red', marginLeft: 5 }} />
          <div className={styles.senderDiv}>
            {item.senderContent}
          </div>
        </div>
        <div style={{  display: item.toFriendContent === '' ? 'none': 'flex', flexDirection: 'row-reverse',  }}>
          <Avatar icon="user" style={{ color: 'green', marginRight: 5 }} />
          <div className={styles.toFriendDiv}>
            {item.toFriendContent}
          </div>
        </div>
      </div>
      ))

    return (
      <div className={styles.main}>
        <InfiniteSrcoll className={styles.scrolls}>
          {messageTips}
        </InfiniteSrcoll>
      </div>
    )
  }
}

export default Message;