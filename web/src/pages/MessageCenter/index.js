import React from 'react';
import { Row, Col, Badge, Avatar, List, Collapse, Button, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import SocketIo from 'socket.io-client';
import moment from 'moment';
import Modal from '@/common/components/Modal';
import Private from './component/Private';
import Request from './component/Request';
import Attention from './component/Attention';
import Chat from './component/Chat';
import styles from './style.less';
import {
  getUpdatesCount
} from '@/services/messageService'

const { Panel } = Collapse;
class MessageCenter extends React.Component {

  state = {
    commentVisible: false,
    messageVisible: false,
    content: '',
    dialogTips: [],
    updateCount: 0,
  }

  componentWillMount() {
    const currentUser = localStorage.getItem('currentUser');
    this.setState({
      currentUser
    })
  }

  componentDidMount() {
    const { currentUser } = this.state;
    this.getUpdatesCount(currentUser);
    this.initSocket();
  }

  // 获取更新数
  getUpdatesCount = name => {
    getUpdatesCount({
      username: name
    }, ({ data }) => {
      this.setState({
        updateCount: data.count,
      })
    },
    e => console.log('getUpdatesCount-error', e.toString())
    )
  }

  // 连接websocket
  initSocket = () => {
    const { dialogTips } = this.state;
    this.socket = SocketIo.connect('http://localhost:80');
    this.socket.on('connect', () => {
      console.log('socket connected');
    });
    this.socket.on('receiveMsg', data => {
      dialogTips.push({
        senderContent: data.content,
        toFriendContent: '',
        logtime: moment(new Date())
      })
      this.setState({
        dialogTips
      })
    })
    this.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
  }

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
    const { commentVisible, messageVisible, dialogTips, content, updateCount } = this.state;
    const footer = (
      <Button onClick={this.handlePushMessage} type="primary" size="small" style={{ float: "right", margin: 5 }}>发送</Button>
    );
    const dataSource = [
      'user1',
      'user2',
      'user3',
      'user1',
      'user2',
      'user3',
    ];
    return (
      <div className={styles.message}>
        {/* 评论 赞我 私信 */}
        <Collapse onChange={() => { }} expandIconPosition="right">
          <Panel
            header={
              <Row type="flex" justify="space-between">
                <Col>
                  <Avatar shape="circle" icon="message" style={{ background: 'green', marginRight: 5 }} size="small" /> 评论
                </Col>
                <Col>
                  <Badge count={5} />
                </Col>
              </Row>
            }
            key="1"
          >
            <InfiniteScroll className={styles.scroll}>
              <List
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      onClick={this.handleCommentClick}
                      avatar={<Avatar shape="circle" icon="message" style={{ background: 'green', marginRight: 5 }} size="small" />}
                      title={<span>{item}评论了我</span>}
                    />
                    <span>{moment(new Date).format('YYYY-MM-DD')}</span>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Panel>
          <Panel
            header={
              <Row type="flex" justify="space-between">
                <Col>
                  <Avatar shape="circle" icon="like" style={{ background: '#F08080', marginRight: 5 }} size="small" /> 赞我
                </Col>
                <Col>
                  <Badge count={3} />
                </Col>
              </Row>
            }
            key="2"
          >
            <InfiniteScroll className={styles.scroll}>
              <List
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar shape="circle" icon="like" style={{ background: '#F08080', marginRight: 5 }} size="small" />}
                      title={<span>{item}</span>}
                    />
                    <span>{moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}</span>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Panel>
        </Collapse>
        {/* 好友 关注 拉黑 */}
        <Collapse style={{ marginTop: 10 }} onChange={() => { }} expandIconPosition="right">
          <Private />
          <Panel
            header={
              <Row type="flex" justify="space-between">
                <Col>
                  <Avatar shape="circle" icon="solution" style={{ background: '#ffbf00', marginRight: 5 }} size="small" /> 聊天
                </Col>
                <Col>
                  <Badge count={7} />
                </Col>
              </Row>
            }
            key="2"
          >
            <InfiniteScroll className={styles.scroll}>
              <List
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar shape="circle" icon="solution" style={{ background: '#ffbf00', marginRight: 5 }} size="small" />}
                      title={item}
                      onClick={this.handlePrivaceClick}
                    />
                    <Badge count={2} />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Panel>
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
          <Chat
            setContent={this.setContent}
            username="张家辉"
            socket={this.socket}
            dialogTips={dialogTips}
            content={content}
          />
        </Modal>

      </div>
    )
  }
}

export default MessageCenter;