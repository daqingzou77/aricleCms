import React from 'react';
import { Collapse, Row, Col, Avatar, Badge, List, Form, message } from 'antd';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import styles from '../style.less';
import {
  getStarList
} from '@/services/messageService';

const { Panel } = Collapse;

export default class Like extends React.Component {
  state = {
    dataSource: []
  }

  componentDidMount() {
    const currentUser = localStorage.getItem('currentUser');
    this.getStarList(currentUser);
  }

  getStarList = username => {
    getStarList({ username }, ({ data }) => {
      this.setState({
        dataSource: data
      })
    },
    e => console.log('getCommentList-error', e.toString())
    )
  }

  render() {
    const { dataSource } = this.state;
    const { count } = this.props;
    return (
      <Collapse expandIconPosition='right'>
        <Panel
          header={
            <Row type="flex" justify="space-between">
              <Col>
                <Avatar shape="circle" icon="like" style={{ background: '#F08080', marginRight: 5 }} size="small" /> 赞我
              </Col>
              <Col>
                <Badge count={count} />
              </Col>
            </Row>
          }
          key="2"
        >
          <InfiniteScroll 
            className={styles.scroll}
            hasMore={false}
            loadMore={()=>{}}
          >
            <List
              dataSource={dataSource}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} shape="circle" icon="like" style={{ background: '#F08080', marginRight: 5 }} size="small" />}
                    title={<span>{item.liker}<span style={{ fontWeight: 'bold', marginLeft: 10 }}>赞了我</span></span>}
                  />
                  <span>{moment(item.time).fromNow()}</span>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Panel>
      </Collapse>
    )
  }
}