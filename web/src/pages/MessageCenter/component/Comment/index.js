import React from 'react';
import { Collapse, Row, Col, Avatar, Badge, List, Form } from 'antd';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import FormElement from '@/components/FormElement';
import Modal from '@/common/components/Modal';
import styles from '../style.less';
import {
  getCommentList
} from '@/services/messageService';

const { Panel } = Collapse;

class Comment extends React.Component {

  state ={
    dataSource: []
  }  
  
  componentDidMount() {
    const currentUser = localStorage.getItem('currentUser');
    this.getCommentList(currentUser);
  }

  getCommentList = username => {
    getCommentList({ username }, ({ data }) => {
      this.setState({
        dataSource: data
      })
    },
    e => console.log('getCommentList-error', e.toString())
    )
  }

  handleWatch = content => {
    const { form } = this.props;
    setTimeout(() => {
      form.setFieldsValue({ 'commetContent': content });
    }, 100)
    this.setState({
      visible: true
    })
  }

  render() {
    const { dataSource, visible } = this.state;
    const { count, form } = this.props;
    const formElementProps = {
      form,
      width: 200
    }
    return (
      <Collapse onChange={() => { }} expandIconPosition="right">
        <Panel
          header={
            <Row type="flex" justify="space-between">
              <Col>
                <Avatar shape="circle" icon="message" style={{ background: 'green', marginRight: 5 }} size="small" /> 评论
              </Col>
              <Col>
                <Badge count={count} />
              </Col>
            </Row>
        }
          key="1"
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
                    onClick={this.handleCommentClick}
                    avatar={<Avatar src={item.avatar} shape="circle" icon="message" style={{ background: 'green', marginRight: 5 }} size="small" />}
                    title={
                      <span>{item.commenter}
                        <a style={{ marginLeft: 10 }} onClick={() => this.handleWatch(item.content)}>
                          评论了我
                        </a>
                      </span>}
                  />
                  <span>{moment(item.time).fromNow()}</span>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </Panel>
        <Modal
          title="评论详情"
          visible={visible}
          footer={null}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
        >
          <Form style={{ padding: 10 }}>
            <FormElement
              {...formElementProps}
              field="commetContent"
              label=""
              type="textarea"
              placeholder=""
              rows={5}
            />
          </Form>
        </Modal>
      </Collapse>
    )
  }
}

export default Form.create({ name: 'Comment'})(Comment);