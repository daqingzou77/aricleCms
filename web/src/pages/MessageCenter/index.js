import React from 'react';
import { Row, Col, Badge, Avatar, List, Collapse, Button, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import SocketIo from 'socket.io-client';
import moment from 'moment';
import Modal from '@/common/components/Modal';
import Comment from './component/Comment';
import Like from './component/Like';
import Private from './component/Private';
import Message from './component/Message';
import Request from './component/Request';
import Attention from './component/Attention';
import Chat from './component/Chat';
import styles from './style.less';
import {
  getCommentCounts,
  getStarCounts,
  getPrivateCounts,
  getUpdatesCounts,
  getNewMessageCounts
} from '@/services/messageService'

const { Panel } = Collapse;
class MessageCenter extends React.Component {

  state = {
    commentVisible: false,
    messageVisible: false,
    content: '',
    dialogTips: [],
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
    this.getNewMessageCounts(currentUser);
    // this.initSocket();
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

  getNewMessageCounts = name => {
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

  // 连接websocket
  // initSocket = () => {
  //   const { dialogTips } = this.state;
  //   this.socket = SocketIo.connect('http://localhost:80');
  //   this.socket.on('connect', () => {
  //     console.log('socket connected');
  //   });
  //   this.socket.on('receiveMsg', data => {
  //     dialogTips.push({
  //       senderContent: data.content,
  //       toFriendContent: '',
  //       logtime: moment(new Date())
  //     })
  //     this.setState({
  //       dialogTips
  //     })
  //   })
  //   this.socket.on('disconnect', () => {
  //     console.log('socket disconnected');
  //   });
  // }

  setContent = content => {
    this.setState({
      content
    })
  }


  // 评论
  handleCommentClick = () => {
    this.setState({
      commentVisible: true
    })
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

  // 私信、好友
  handlePrivaceClick = () => {
    this.setState({
      messageVisible: true
    })
  }

  handlePrivateOk = () => {
    this.setState({
      messageVisible: false
    })
  }

  handlePrivateCancel = () => {
    const username = '张家辉';
    this.socket.emit('logout', {
      username
    })
    this.setState({
      messageVisible: false,
      dialogTips: []
    })
  }

  handlePushMessage = () => {
    const { content, dialogTips } = this.state;
    if (!content) {
      message.warning('请输入内容')
    }
    dialogTips.push({
      senderContent: '',
      toFriendContent: content,
      logtime: moment(new Date())
    })
    this.socket.emit('sendMessage', {
      sender: '张家辉',
      toFriend: '古天乐',
      time: new Date(),
      content
    });
    this.setState({
      dialogTips,
      content: ''
    })

  }

  render() {
    const { commentVisible, messageVisible, dialogTips, content, updateCount, commentCount, starCount, privateCount, newMessageArray } = this.state;
    const footer = (
      <Button onClick={this.handlePushMessage} type="primary" size="small" style={{ float: "right", margin: 5 }}>发送</Button>
    );
    return (
      <div className={styles.message}>
        <Collapse onChange={() => { }} expandIconPosition="right">
          <Comment count={commentCount} />
          <Like count={starCount} />
        </Collapse>
        {/* 好友 关注 拉黑 */}
        <Collapse style={{ marginTop: 10 }} onChange={() => { }} expandIconPosition="right">
          <Private count={privateCount} />
          <Message messageArray={newMessageArray} />
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
        <Modal
          title={`User${1}`}
          visible={messageVisible}
          onOk={this.handlePrivateOk}
          onCancel={this.handlePrivateCancel}
          footer={footer}
        >
          {/* <Chat
            setContent={this.setContent}
            username="张家辉"
            socket={this.socket}
            dialogTips={dialogTips}
            content={content}
          /> */}
        </Modal>

      </div>
    )
  }
}

export default MessageCenter;