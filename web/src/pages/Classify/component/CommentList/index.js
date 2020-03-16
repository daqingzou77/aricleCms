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

function include(arr, index) {
  const result = false;
    if (!arr) {
      return false;
    }
    if (arr[0].indexArray.includes(index)) {
      return !result;
    }
    return result;
  }

class CommentList extends React.Component {

  state = {
    replyModal: false,
    currentCommenter: '',
    choose1Index: [{ indexArray: [] }],
    choose2Index: [{ indexArray: [] }],
  }

  componentWillReceiveProps(nextProps) {
    const { choose1Index, choose2Index } = this.state;
    const { comments: { commentList } } = nextProps;
    commentList.map(item => {
      const { likes, dislikes } = item;
      choose1Index.push({ likes });
      choose2Index.push({ dislikes });
    })
    this.setState({
      choose1Index,
      choose2Index
    })
  }

  solveComment = (_id, articlename, commentTime, key, index) => {
    const { choose1Index, choose2Index } = this.state;
    solveComment({
      _id,
      articlename,
      commentTime,
      key
    }, ({ data }) => {
      if (data.status) {
        if (key === 1) {
          message.success('评论点赞成功');
          choose1Index[index+1].likes += 1;
          this.setState({
            choose1Index,
          })
        } else if (key ===2) {
          message.success('评论拉黑成功');
          choose2Index[index+1].dislikes += 1;
          this.setState({
            choose2Index,
          })
        }
      }
    },
    e => console.log('solveComment-error', e.toString())
    )
  }

  handleArticle = (_id, articlename, commentTime, key, index) => {
    const { choose1Index, choose2Index } = this.state;
    if (key === 1) {
      if (include(choose1Index, index)){
         message.warning('评论已赞');
         return;
      }
      if (include(choose2Index, index)) {
        message.warning('评论已拉黑，不能点赞');
      } else {
        choose1Index[0].indexArray.push(index);
        this.solveComment(_id, articlename, commentTime, 1, index);
      }
      this.setState({
        choose1Index
      })
    } else if (key === 2) {
      if (include(choose2Index, index)){
        message.warning('评论已拉黑');
        return;
      }
      if (include(choose1Index, index)) {
        message.warning('评论已赞，不能拉黑');
      } else {
        choose2Index[0].indexArray.push(index);
        this.solveComment(_id, articlename, commentTime, 2, index);
      }
      this.setState({
        choose2Index,
        choose1Index
      })
    }
  }

  // 私信某用户
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
    const currentUser = localStorage.getItem('currentUser');
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
                    text={!choose1Index[index+1] ? item.likes : choose1Index[index+1].likes} 
                    twoToneColor={include(choose1Index, index) ? '#FF0000': ''}  
                    onClick={() => this.handleArticle(item._id, commentArticlename, item.commentTime, 1, index)}
                  />,
                  <IconText 
                    icon={DislikeTwoTone} 
                    text={!choose2Index[index+1] ? item.dislikes : choose2Index[index+1].dislikes} 
                    twoToneColor={include(choose2Index, index) ? '#303030': ''}
                    onClick={() => this.handleArticle(item._id, commentArticlename, item.commentTime, 2, index)}
                  />,
                  <span>
                    评论时间：{moment(item.commentTime).format('YYYY-MM-DD hh:mm:ss')}
                  </span>
                ]}
                extra={currentUser === item.commenter ? null : <a onClick={() => this.handleOnReply(item.commenter)}>私信</a>}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<span>{item.commenter}</span>}
                  description={item.commentContent}
                />
              </List.Item>
          )}
          />
        </InfiniteScroller>
        <Modal
          visible={replyModal}
          title={`私信用户--${currentCommenter}`}
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