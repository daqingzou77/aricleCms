import React from 'react';
import { Avatar } from 'antd';
import InfiniteSrcoll from 'react-infinite-scroller';
import styles from './style.less'

class Message extends React.Component {

  state = {
    showAllMessage: false
  }

  showHistory = () => {
    this.setState({
      showAllMessage: true
    })
  }

  render() {
    const { showAllMessage } = this.state;
    const { dialogTips } = this.props;
    let newDialog;
    if (!showAllMessage && dialogTips.length > 7) {
      newDialog = dialogTips.slice(0, 7);
    } else {
      newDialog = dialogTips;
    }
    const messages = newDialog.map((item, index, arr) => (
      <div className={styles.mainDiv}>
        <div style={{ textAlign: 'center'}}>{index === 0 ? item.logtime.format('hh:mm:ss') : item.logtime.second() - arr[index-1].logtime.second() > 5 ? item.logtime.format('hh:mm:ss') : null}</div>
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
          {
            !showAllMessage && dialogTips.length > 7 ?  (
              <div className={styles.loadMore}>
                <a onClick={this.showHistory}>获取更早记录</a>
              </div>
            ) : null
          }
          {messages}
        </InfiniteSrcoll>
      </div>
    )
  }
}

export default Message;