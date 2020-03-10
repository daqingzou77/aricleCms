import React from 'react';
import { List, Avatar, Form, message, Button, Popover } from 'antd';
import { LikeTwoTone, DislikeTwoTone, StarTwoTone, MessageTwoTone } from '@ant-design/icons';
import moment from 'moment';
import InfiniteScroller from 'react-infinite-scroller';
import FormElement from '@/components/FormElement';
import Modal from '@/common/components/Modal';
import styles from './style.less';
import { 
  solveComment
} from '@/services/articleSevice'

class CommentList extends React.Component {

  state = {
    replyModal: false,
    choose1Index: [],
    choose2Index: [],
  }

  solveComment = () => {

  }
  
  handleArticle = (name, key, index) => {
    const { choose1Index, choose2Index } = this.state;
    if (key === 1) {
      if (choose1Index.includes(index)) {
        choose1Index.splice(choose1Index.indexOf(index), 1);
        message.success('取消点赞');
      } else {
        message.success('点赞成功');
        choose1Index.push(index);
        if (choose2Index.indexOf(index) !== -1)
          choose2Index.splice(choose2Index.indexOf(index), 1);
      }
    } else if (key === 2) {
      if (choose2Index.includes(index)) {
        choose2Index.splice(choose2Index.indexOf(index), 1);
        message.success('取消拉黑');
      } else {
        message.success('拉黑成功');
        choose2Index.push(index);
        if (choose1Index.indexOf(index) !== -1)
          choose1Index.splice(choose1Index.indexOf(index), 1);
      }
    }
    this.setState({
      choose2Index,
      choose1Index
    }); 
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
    const { replyModal, choose1Index, choose2Index, choose3Index, choose4Index } = this.state;
    const { form, comments } = this.props;
    console.log('comments', comments);
    const formElementProps = {
      form,
      width: 300
    }
    const IconText = ({ icon, text, twoToneColor, onClick }) => (
      <span>
        {React.createElement(icon, { style: { marginRight: 8,  }, twoToneColor, onClick } )}
        {text}
      </span>
    );
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
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <IconText 
                    icon={LikeTwoTone} 
                    text={11} 
                    twoToneColor={choose1Index.includes(index) ? '#FF0000': ''}  
                    onClick={() => this.handleArticle('', 1, index)}
                  />,
                  <IconText 
                    icon={DislikeTwoTone} 
                    text={12} 
                    twoToneColor={choose2Index.includes(index) ? '#303030': ''}
                    onClick={() => this.handleArticle('', 2, index)}
                  />,
                  <span>
                    评论时间：{moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}
                  </span>
                ]}
                extra={<a onClick={() => this.handleOnReply()}>回复</a>}
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