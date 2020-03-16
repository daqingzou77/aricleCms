import React from 'react';
import { Collapse, Row, Col, Avatar, Badge, List } from 'antd';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import styles from '../style.less';

const { Panel } = Collapse;
export default class Private extends React.Component { 
  
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
                <Avatar shape="circle" icon="mail" style={{ background: '#7265e6', marginRight: 5 }} size="small" /> 私信
              </Col>
              <Col>
                <Badge count={3} />
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
                    avatar={<Avatar shape="circle" icon="like" style={{ background: '#7265e6', marginRight: 5 }} size="small" />}
                    title={<span>{item}</span>}
                  />
                  <span>{moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}</span>
                </List.Item>
            )}
            />
          </InfiniteScroll>
        </Panel>
      </Collapse>
      
    )
  }
}