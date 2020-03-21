import React from 'react';
import { Collapse } from 'antd';
import Modal from '@/components/Modal';
import Comment from './component/Comment';
import Like from './component/Like';
import Private from './component/Private';
import Message from './component/Message';
import Request from './component/Request';
import Attention from './component/Attention';
import styles from './style.less';
import {
  getCommentCounts,
  getStarCounts,
  getPrivateCounts,
  getUpdatesCounts,
  getNewMessageCounts
} from '@/services/messageService'

class MessageCenter extends React.Component {

  state = {
    commentVisible: false,
    commentCount: 0,
    starCount: 0,
    privateCount: 0,
    updateCount: 0,
    newMessageArray: []
  }

  componentWillMount() {
    const currentUser = localStorage.getItem('currentUser');
    this.setState({
      currentUser
    })
  }

  componentDidMount() {
    const { currentUser } = this.state;
    this.getCommentCounts(currentUser);
    this.getStarCounts(currentUser);
    this.getPrivateCounts(currentUser);
    this.getUpdatesCounts(currentUser);
    this.getNewMessageCounts();
  }

  // 获取更新数
  getUpdatesCounts = name => {
    getUpdatesCounts({
      username: name
    }, ({ data }) => {
      this.setState({
        updateCount: data.count,
      })
    },
    e => console.log('getUpdatesCounts-error', e.toString())
    )
  }

  // 获取评论数
  getCommentCounts = name => {
    getCommentCounts({
      username: name
    }, ({ data }) => {
      this.setState({
        commentCount: data.count,
      })
    },
    e => console.log('getCommentCounts-error', e.toString())
    )
  }

  // 获取点赞数
  getStarCounts = name => {
    getStarCounts({
      username: name
    }, ({ data }) => {
      this.setState({
        starCount: data.count,
      })
    },
    e => console.log('getStarCounts-error', e.toString())
    )
  }

  // 获取私信个数
  getPrivateCounts = name => {
    getPrivateCounts({
      username: name
    }, ({ data }) => {
      this.setState({
        privateCount: data.count,
      })
    },
    e => console.log('getStarCounts-error', e.toString())
    )
  }

  // 获取新消息
  getNewMessageCounts = () => {
    const name = localStorage.getItem('currentUser');
    getNewMessageCounts({
      username: name
    }, ({ data }) => {
      this.setState({
        newMessageArray: data,
      })
    },
    e => console.log('getStarCounts-error', e.toString())
    )
  }

  handleCommentOk = () => {
    this.setState({
      commentVisible: false
    })
  }

  handleCommentCancel = () => {
    this.setState({
      commentVisible: false
    })
  }

  render() {
    const { commentVisible, updateCount, commentCount, starCount, privateCount, newMessageArray } = this.state;
    const userType = localStorage.getItem('userType');
    return (
      <div className={styles.message}>
        {
          userType === '1' ? (
            <Collapse onChange={() => { }} expandIconPosition="right">
              <Comment count={commentCount} />
              <Like count={starCount} />
            </Collapse>
          ) : null
        }
        <Collapse style={{ marginTop: 10 }} onChange={() => { }} expandIconPosition="right">
          <Private count={privateCount} />
          <Message 
            messageArray={newMessageArray} 
            getNewMessageCounts={this.getNewMessageCounts}
          />
          <Request />
          <Attention count={updateCount} />
        </Collapse>
        <Modal
          title="评论详情"
          visible={commentVisible}
          onOk={this.handleCommentOk}
          onCancel={this.handleCommentCancel}
        >
          评论详情
        </Modal>
      </div>
    )
  }
}

export default MessageCenter;