import React from 'react';
import { List, Avatar, Form, message, Button } from 'antd';
import InfiniteScroller from 'react-infinite-scroller';
import FormElement from '@/components/FormElement';
import Modal from '@/common/components/Modal';
import styles from './style.less';

class CommentList extends React.Component {

  state = {
    replyModal: false
  }

  handleOnReply = () => {
    this.setState({
      replyModal: true
    })
  }

  handleReplys = () => {
    this.setState({
      replyModal: false
    })
  }
  
  handleReplyCancel = () => {
    this.setState({
      replyModal: false
    })
  }

  render() {
    const { replyModal } = this.state;
    const { form } = this.props;
    const formElementProps = {
      form,
      width: 300
    }
    const footer = (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
        <Button onClick={this.handleReplys} style={{ marginRight: 10 }}>取消</Button>
        <Button onClick={this.handleReplyCancel} type="primary">回复</Button>
      </div>
    )
    const data = [
        {
          title: 'Ant Design Title 1',
        },
        {
          title: 'Ant Design Title 2',
        },
        {
          title: 'Ant Design Title 3',
        },
        {
          title: 'Ant Design Title 4',
        },
      ];
    return (
      <div className={styles.comment}>
        <InfiniteScroller className={styles.commentScroller}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item
                actions={[<a onClick={() => this.handleOnReply()}>回复</a>]}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
          )}
          />
        </InfiniteScroller>
        <Modal
          visible={replyModal}
          title={`回复-作者`}
          footer={footer}
          onCancel={() => this.setState({ replyModal: false })}
        >
          <Form style={{ padding: 10 }}>
            <FormElement
              {...formElementProps}
              field="replyContent"
              label=""
              type="textarea"
              placeholder="请输入回复内容..."
              rows={7}
            />
          </Form>
        </Modal>
      </div>  
    )
  }
}

export default Form.create({ name: 'CommentList'})(CommentList);