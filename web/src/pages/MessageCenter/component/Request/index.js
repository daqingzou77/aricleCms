import React from 'react';
import { List, Avatar, message, Collapse, Row, Col, Badge } from 'antd';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import styles from '../style.less';
import {
  getFriendRequest,
  solveFriendRequest
} from '@/services/messageService';

const { Panel } = Collapse;

@withRouter
export default class Request extends React.Component {
  state = {
    dataSource: []
  }

  componentDidMount() {
    this.getFriendRequest();
  }

  getFriendRequest = () => {
    const currentUser = localStorage.getItem('currentUser');
    getFriendRequest({
      username: currentUser
    }, ({ data }) => {
      this.setState({
        dataSource: data
      })
    },
      e => console.log('getFriendRequest-error', e.toString())
    )
  }

  handleSolve = (name, key) => {
    const currentUser = localStorage.getItem('currentUser');
    solveFriendRequest({
      requester: name,
      targetUser: currentUser,
      key
    }, ({ data }) => {
      if (data.status) {
        message.success('处理成功');
        this.getFriendRequest();
        if (this.props.location.pathname === '/userCenter/personCenter' && key === 1) {
          window.location.reload(); // 强刷页面
        }
      }
    },
      e => console.log('handleSolve-error', e.toString())
    )
  }

  render() {
    const { dataSource } = this.state;
    const count = dataSource.length;
    return (
      <Collapse expandIconPosition="right">
        <Panel
          header={
            <Row type="flex" justify="space-between">
              <Col>
                <Avatar shape="circle" icon="user" style={{ background: '#f56a00', marginRight: 5 }} size="small" /> 请求
              </Col>
              <Col>
                <Badge count={count} />
              </Col>
            </Row>
          }
          key="3"
        >
          <InfiniteScroll className={styles.scroll}>
            <List
              dataSource={dataSource}
              itemLayout="horizontal"
              renderItem={item => (
                <List.Item
                  actions={[
                    <a onClick={() => this.handleSolve(item.name, 1)}>同意</a>,
                    <a onClick={() => this.handleSolve(item.name, 2)}>拒绝</a>]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} shape="circle" icon="user" style={{ background: '#f56a00', marginRight: 5 }} size="small" />}
                    title={item.name}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Panel>
      </Collapse>
    )
  }
}
