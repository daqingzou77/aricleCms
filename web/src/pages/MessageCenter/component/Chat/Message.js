/* eslint-disable no-nested-ternary */
import React from 'react';
import { Avatar } from 'antd';
import InfiniteSrcoll from 'react-infinite-scroller';
import styles from './style.less'

class Message extends React.Component {

  state = {
    dialogMessge: []
  }

  componentWillReceiveProps(nextProps) {
    const { dialogTips } = nextProps;
    let { dialogMessge } = this.state;
    if (dialogTips.length > 7) {
      dialogMessge = dialogTips.slice(dialogTips.length-8);
    } else {
      dialogMessge = dialogTips;
    }
    this.setState({
      dialogMessge
    })
  }

  showHistory = () => {
    const { dialogTips } = this.props;
    this.setState({
      dialogMessge: dialogTips
    })
  }

  render() {
    const { dialogMessge } = this.state;
    const { myAvatar, friendAvatar } = this.props;
    const messages = dialogMessge.map((item, index, arr) => (
      <div className={styles.mainDiv}>
        <div style={{ textAlign: 'center'}}>
          {
            index === 0 ? 
            item.logtime.format('hh:mm:ss') :
            item.logtime.minute() - arr[index-1].logtime.minute() > 2 ? 
            item.logtime.format('hh:mm:ss') : null
          }
        </div>
        <div 
          style={{ display: item.senderContent === '' ? 'none': 'flex', flexDirection: 'row' }}
        >
          <Avatar src={friendAvatar} icon="user" style={{ color: 'red', marginLeft: 5 }} />
          <div className={styles.senderDiv}>
            {item.senderContent}
          </div>
        </div>
        <div 
          style={{ display: item.toFriendContent === '' ? 'none': 'flex', flexDirection: 'row-reverse',  }}
        >
          <Avatar src={myAvatar} icon="user" style={{ color: 'green', marginRight: 5 }} />
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
            dialogMessge.length > 7 ?  (
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