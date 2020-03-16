/* eslint-disable no-nested-ternary */
import React from 'react';
import { Table, Spin, Empty, message, Form, Popover, List } from 'antd';
import { LikeTwoTone, DislikeTwoTone, StarTwoTone, MessageTwoTone } from '@ant-design/icons'
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import FormElement from '@/components/FormElement';
import Modal from '@/common/components/Modal';
import CommentList from '../CommentList';
import {
  downloadAnnex
} from '@/services/annexService';
import {
  solveArticle,
  commentArticle,
  getArticleComment
} from '@/services/articleSevice';
import styles from './style.less';

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

class Tables extends React.Component {

  columns = [{
    title: '文章名',
    dataIndex: 'articlename',
  }, {
    title: '作者',
    dataIndex: 'author',
  }, {
    title: '文章类型',
    dataIndex: 'articleType',
    render: (_, record) => {
      let text;
      switch (record.articleType) {
        case 0: text = "科学"; break;
        case 1: text = "历史"; break;
        case 2: text = "文学"; break;
        case 3: text = "体育"; break;
        default: text = "";
      }
      return text
    }
  }, {
    title: '文章简述',
    dataIndex: 'articleDescription'
  }, {
    title: '文章形式',
    dataIndex: 'articleForm',
    render: (_, record) => (
      <span>{record.articleForm === 0 ? '在线发布' : '附件上传'}</span>
    )
  }, {
    title: '操作',
    dataIndex: 'conduct',
    render: (_, record, index) => {
      const { articlename } = record;
      const that = this;
      const { choose1Index, choose2Index, choose3Index, choose4Index } = that.state;
      return (
        <>
          <LikeTwoTone
            twoToneColor={include(choose1Index, index) ? '#FF0000' : ''}
            onClick={() => that.handleArticle(articlename, 1, index)}
          /> {choose1Index[index + 1].likes}
          <DislikeTwoTone
            style={{ marginLeft: 8 }}
            twoToneColor={include(choose2Index, index) ? '#303030' : ''}
            onClick={() => that.handleArticle(articlename, 2, index)}
          /> {choose2Index[index + 1].dislikes}
          <StarTwoTone
            style={{ marginLeft: 8 }}
            twoToneColor={include(choose3Index, index) ? '#FFCC00' : ''}
            onClick={() => that.handleArticle(articlename, 3, index)}
          /> {choose3Index[index + 1].favorites}
          <Popover
            content={
              <>
                <a onClick={() => that.showHistoryComment(articlename)}>历史评论</a>
                <a onClick={() => that.handleArticle(articlename, 4, index)} style={{ float: 'right' }}>评论本文</a>
              </>
            }
            title="操作详情"
          >
            <MessageTwoTone
              style={{ marginLeft: 8 }}
              twoToneColor={include(choose4Index, index) ? '#CC6600' : ''}
            /> {choose4Index[index + 1].comments}
          </Popover>
        </>
      )
    }
  }, {
    title: "文章内容",
    datIndex: 'articleContent',
    render: (_, record) => {
      const { articleForm, annexname, articlename, articleContent } = record;
      return (
        <a onClick={() => this.handleClick(annexname, articleForm, articleContent)}>{articleForm === 0 ? articlename : annexname}</a>
      )
    }
  }];

  state = {
    visible: false,
    commentModalVisible: false,
    historyModal: false,
    editorState: '',
    choose1Index: [{ indexArray: [] }],
    choose2Index: [{ indexArray: [] }],
    choose3Index: [{ indexArray: [] }],
    choose4Index: [{ indexArray: [] }],
    commentArticlename: '',
    commentIndex: -1,
    comments: []
  }

  componentWillReceiveProps(nextProps) {
    const { dataSource } = nextProps;
    const { choose1Index, choose2Index, choose3Index, choose4Index } = this.state;
    dataSource.map(item => {
      const { likes, dislikes, favorites, comments } = item;
      choose1Index.push({ likes });
      choose2Index.push({ dislikes });
      choose3Index.push({ favorites });
      choose4Index.push({ comments });
    })
    this.setState({
      choose1Index,
      choose2Index,
      choose3Index,
      choose4Index
    })
  }

  solveArticle = (articlename, key, index) => {
    const { choose1Index, choose2Index, choose3Index } = this.state;
    const currentUser = localStorage.getItem('currentUse');
    solveArticle({
      articlename,
      key,
      liker: currentUser
    }, ({ data }) => {
      if (data.status) {
        if (key === 1) {
          message.success('文章点赞成功');
          choose1Index[index + 1].likes += 1;
          this.setState({
            choose1Index
          })
        } else if (key === 2) {
          message.success('文章拉黑成功');
          choose2Index[index + 1].dislikes += 1;
          this.setState({
            choose2Index
          })
        } else if (key === 3) {
          message.success('文章收藏成功');
          choose3Index[index + 1].favorites += 1;
          this.setState({
            choose3Index
          })
        } else if (key === 4) {
          message.success('取消收藏成功');
          choose3Index[index + 1].favorites -= 1;
          this.setState({
            choose3Index
          })
        }
      }
    },
      e => console.log('solveArticle-error', e.toString())
    )
  }

  commentArticle = (index) => {
    const { form } = this.props;
    const commentContent = form.getFieldValue('comment');
    const { commentArticlename, choose4Index } = this.state;
    const commenter = localStorage.getItem('currentUser');
    commentArticle({
      articlename: commentArticlename,
      commentContent,
      commenter
    }, ({ data }) => {
      if (data.status) {
        message.success('文章评论成功');
        choose4Index[index + 1].comments += 1;
        this.setState({
          choose4Index
        })
      } else {
        message.error('文章评论失败');
      }
    },
      e => console.log('commentArticle-error', e.toString())
    )
  }

  getArticleComment = articlename => {
    getArticleComment({
      articlename
    }, ({ data }) => {
      this.setState({
        comments: data
      })
    },
      e => console.log('comments-error', e.toString())
    )
  }

  handleClick = (name, articleForm, articleContent) => {
    if (articleForm === 0) {
      const contentBlock = htmlToDraft(articleContent);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        visible: true,
        editorState
      })
    } else {
      downloadAnnex(name)
    }
  }

  showHistoryComment = articlename => {
    this.getArticleComment(articlename);
    this.setState({
      historyModal: true,
      commentArticlename: articlename
    })
  }

  handleArticle = (articlename, key, index) => {
    const { choose1Index, choose2Index, choose3Index } = this.state;
    if (key === 1) {
      if (include(choose1Index, index)) {
        message.warning('文章已赞');
        return;
      }
      if (include(choose2Index, index)) {
        message.warning('该文章已拉黑，不能点赞');
      } else {
        choose1Index[0].indexArray.push(index);
        this.solveArticle(articlename, 1, index);
      }
      this.setState({
        choose1Index
      })
    } else if (key === 2) {
      if (include(choose2Index, index)) {
        message.warning('文章已拉黑');
        return;
      }
      if (include(choose1Index, index)) {
        message.warning('该文章已赞，不能拉黑');
      } else {
        this.solveArticle(articlename, 2, index);
        choose2Index[0].indexArray.push(index);
      }
      this.setState({
        choose2Index,
      })
    } else if (key === 3) {
      if (include(choose3Index, index)) {
        choose3Index[0].indexArray.splice(choose3Index[0].indexArray.indexOf(index), 1);
        this.solveArticle(articlename, 4, index);
      } else {
        this.solveArticle(articlename, 3, index);
        choose3Index[0].indexArray.push(index);
      }
      this.setState({
        choose3Index
      })
    } else if (key === 4) {
      this.setState({
        commentModalVisible: true,
        commentIndex: index,
        commentArticlename: articlename
      })
    }
  }

  handleOk = () => {
    this.setState({
      visible: false
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleCommentOk = () => {
    const { choose4Index, commentIndex } = this.state;
    if (!include(choose4Index, commentIndex)) {
      choose4Index[0].indexArray.push(commentIndex);
    }
    this.setState({
      commentModalVisible: false,
      choose4Index
    })
    this.commentArticle(commentIndex);
  }

  handleCommentCancel = () => {
    this.setState({
      commentModalVisible: false,
    })
  }

  handleHistoryOk = () => {
    this.setState({
      historyModal: true
    })
  }

  handleHistoryCancel = () => {
    this.setState({
      historyModal: false
    })
  }

  render() {
    const { loading, dataSource, form } = this.props;
    const { editorState, visible, commentModalVisible, commentArticlename, historyModal, comments } = this.state;
    const formElementProps = {
      form,
      width: 300,
    }
    return (
      <>
        {
          loading ? (
            <Spin spinning={loading} style={{ marginLeft: '50%' }} />
          ) :
            dataSource.length > 0 ? (
              <Table
                dataSource={dataSource}
                loading={loading}
                columns={this.columns}
              />
            ) : (
                <Empty description={<span className={styles.matchFontStyle}>无匹配结果</span>} />
              )
        }
        <Modal
          visible={visible}
          title="内容详情"
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
          <Editor
            editorState={editorState}
          />
        </Modal>
        <Modal
          visible={commentModalVisible}
          title={`评论文章-《${commentArticlename}》`}
          onOk={this.handleCommentOk}
          onCancel={this.handleCommentCancel}
          showOk
          showCancel
        >
          <Form style={{ padding: 10 }}>
            <FormElement
              {...formElementProps}
              field="comment"
              label=""
              type="textarea"
              placeholder="请输入评论内容..."
              rows={7}
            />
          </Form>
        </Modal>
        <Modal
          visible={historyModal}
          title={`评论详情-${commentArticlename}`}
          onOk={this.handleHistoryOk}
          onCancel={this.handleHistoryCancel}
          footer={null}
        >
          <CommentList comments={comments} commentArticlename={commentArticlename} />
        </Modal>
      </>
    )
  }
}

export default Form.create({ name: 'Tables' })(Tables);