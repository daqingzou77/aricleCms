import React from 'react';
import { Collapse, Row, Col, Avatar, Badge, List, message } from 'antd';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import Modal from '@/common/components/Modal';
import styles from '../style.less';

const { Panel } = Collapse;

export default class Message extends React.Component {
  state = {
    dataSource: []
  }

  render() {
    const { dataSource } = this.state;
    return (
      <Collapse expandIconPosition="right">
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
      </Collapse>
    )
  }
}