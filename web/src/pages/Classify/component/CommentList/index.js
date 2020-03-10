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
    currentCommenter: '',
    choose1Index: [],
    choose2Index: [],
  }

  solveComment = (_id, articlename, commentTime, key) => {
    solveComment({
      _id,
      articlename,
      commentTime,
      key
    }, ({ data }) => {
      if (data.status) {
        if (key === 1) {
          message.success('评论点赞成功');
        } else if (key ===2) {
          message.success('评论拉黑成功');
        }
      }
    },
    e => console.log('solveComment-error', e.toString())
    )
  }

  handleArticle = (_id, articlename, commentTime, key, index) => {
    const { choose1Index, choose2Index } = this.state;
    if (key === 1) {
      if (choose1Index.includes(index)){
         message.warning('评论已赞');
         return;
      }
      if (choose2Index.includes(index)) {
        message.warning('评论已拉黑，不能点赞');
      } else {
        choose1Index.push(index);
        this.solveComment(_id, articlename, commentTime, 1);
      }
      this.setState({
        choose1Index
      })
    } else if (key === 2) {
      if (choose2Index.includes(index)){
        message.warning('评论已拉黑');
        return;
      }
      if (choose1Index.includes(index)) {
        message.warning('评论已赞，不能拉黑');
      } else {
        this.solveComment(_id, articlename, commentTime, 2);
        choose2Index.push(index);
      }
      this.setState({
        choose2Index,
        choose1Index
      })
    }
  }

  handleOnReply = name => {
    this.setState({
      replyModal: true,
      currentCommenter: name
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
    const { replyModal, choose1Index, choose2Index, currentCommenter } = this.state;
    const { form, comments: { commentList }, commentArticlename } = this.props;
    let dataSource = [];
    if (commentList) {
      dataSource = commentList
    }
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
        <Button onClick={this.handleReplyCancel} type="primary">私信</Button>
      </div>
    )
    return (
      <div className={styles.comment}>
        <InfiniteScroller className={styles.commentScroller}>
          <List
            itemLayout="vertical"
            dataSource={dataSource}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <IconText 
                    icon={LikeTwoTone} 
                    text={item.likes} 
                    twoToneColor={choose1Index.includes(index) ? '#FF0000': ''}  
                    onClick={() => this.handleArticle(item._id, commentArticlename, item.commentTime, 1, index)}
                  />,
                  <IconText 
                    icon={DislikeTwoTone} 
                    text={item.dislikes} 
                    twoToneColor={choose2Index.includes(index) ? '#303030': ''}
                    onClick={() => this.handleArticle(item._id, commentArticlename, item.commentTime, 2, index)}
                  />,
                  <span>
                    评论时间：{moment(item.commentTime).format('YYYY-MM-DD hh:mm:ss')}
                  </span>
                ]}
                extra={<a onClick={() => this.handleOnReply(item.commenter)}>回复</a>}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.commenter}</a>}
                  description={item.commentContent}
                />
              </List.Item>
          )}
          />
        </InfiniteScroller>
        <Modal
          visible={replyModal}
          title={`回复作者--${currentCommenter}`}
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