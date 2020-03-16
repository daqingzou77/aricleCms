import React from 'react';
import { Collapse, Row, Col, Avatar, Badge, List, Form, message } from 'antd';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import Modal from '@/common/components/Modal';
import FormElement from '@/components/FormElement';
import styles from '../style.less';
import {
  getPrivateLetter,
  deletePrivateItem
} from '@/services/messageService';

const { Panel } = Collapse;

class Private extends React.Component {

  state = {
    dataSource: [],
    contentModal: false
  }

  componentDidMount() {
    this.getPrivateLetter();
  }

  getPrivateLetter = () => {
    const currentUser = localStorage.getItem('currentUser');
    getPrivateLetter({
      username: currentUser
    }, ({ data }) => {
      this.setState({
        dataSource: data
      })
    },
      e => console.log('getPrivateLetter-error', e.toString())
    )
  }

  watchContent = content => {
    const { form } = this.props;
    this.setState({
      contentModal: true
    })
    setTimeout(() => {
      form.setFieldsValue({ 'replyContent': content });
    }, 100)
  }

  deletePrivateItem = (name, time) => {
    const currentUser = localStorage.getItem('currentUser');
    deletePrivateItem({
      username: currentUser,
      targetUser: name,
      time
    }, ({ data }) => {
      if (data.status) {
        message.success('删除私信成功');
        this.getPrivateLetter();
      } else {
        message.error('删除私信失败')
      }
    })
  }

  render() {
    const { dataSource, contentModal } = this.state;
    const { form } = this.props;
    const formElementProps = {
      form,
      width: 300
    }
    return (
      <>
        <Collapse expandIconPosition="right">
          <Panel
            header={
              <Row type="flex" justify="space-between">
                <Col>
                  <Avatar shape="circle" icon="mail" style={{ background: '#7265e6', marginRight: 5 }} size="small" /> 私信
                </Col>
                <Col>
                  <Badge count={dataSource.length} />
                </Col>
              </Row>
            }
            key="1"
          >
            <InfiniteScroll className={styles.scroll}>
              <List
                dataSource={dataSource}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a onClick={() => this.watchContent(item.content)}>查看</a>,
                      <a onClick={() => this.deletePrivateItem(item.replyer, item.time)}>删除</a>]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} shape="circle" icon="mail" style={{ background: '#7265e6', marginRight: 5 }} size="small" />}
                      title={<span>{item.replyer}</span>}
                    />
                    <span>{moment(item.time).format('YYYY-MM-DD hh:mm:ss')}</span>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Panel>
        </Collapse>
        <Modal
          title="私信详情"
          visible={contentModal}
          footer={null}
          onOk={() => this.setState({ contentModal: false })}
          onCancel={() => this.setState({ contentModal: false })}
        >
          <Form style={{ padding: 10 }}>
            <FormElement
              {...formElementProps}
              field="replyContent"
              label=""
              type="textarea"
              placeholder=""
              rows={7}
            />
          </Form>
        </Modal>
      </>
    )
  }
}


export default Form.create({ name: 'Private' })(Private)