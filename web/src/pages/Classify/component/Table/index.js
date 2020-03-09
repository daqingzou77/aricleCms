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
import styles from './style.less';


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
            twoToneColor={choose1Index.includes(index) ? '#FF0000': ''}  
            onClick={() => that.handleArticle(articlename, 1, index)}
          /> 100
          <DislikeTwoTone
            style={{ marginLeft: 8 }} 
            twoToneColor={choose2Index.includes(index) ? '#303030': ''}
            onClick={() => that.handleArticle(articlename, 2, index)}
          /> 10
          <StarTwoTone 
            style={{ marginLeft: 8 }} 
            twoToneColor={choose3Index.includes(index) ? '#FFCC00': ''}
            onClick={() => that.handleArticle(articlename, 3, index)}
          /> 20
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
              twoToneColor={choose4Index.includes(index) ? '#CC6600': ''}
            /> 12
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
    choose1Index: [],
    choose2Index: [],
    choose3Index: [],
    choose4Index: [],
    commentArticlename: '',
    commentIndex: -1,
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

  showHistoryComment = () => {
    this.setState({
      historyModal: true
    })
  }

  handleArticle = (articlename, key, index) => {
    const { choose1Index, choose2Index, choose3Index } = this.state;
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
      this.setState({
        choose1Index,
        choose2Index
      })
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
      this.setState({
        choose2Index,
        choose1Index
      })
    } else if (key === 3) {
      if (choose3Index.includes(index)) {
        choose3Index.splice(choose3Index.indexOf(index), 1);
        message.success('取消收藏');
      } else {
        message.success('收藏成功');
        choose3Index.push(index);
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
    if (!choose4Index.includes(commentIndex)) {
      choose4Index.push(commentIndex);
    }
    this.setState({
      commentModalVisible: false,
      choose4Index
    })
    message.success('评论成功')
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
    const { editorState, visible, commentModalVisible, commentArticlename, historyModal } = this.state;
    const dataSources = [{
      articlename: '水浒'
    }, {
      articlename: '三国'
    }, {
      articlename: '西游'
    }]
    const formElementProps = {
      form,
      width: 300,
    }
    return (
      <>
        {/* {
          loading ? (
            <Spin spinning={loading} style={{ marginLeft: '50%' }} />
          ) :
            dataSource.length > 0 ? (
              <Table
                dataSource={dataSources}
                loading={loading}
                columns={this.columns}
              />
            ) : (
              <Empty description={<span className={styles.matchFontStyle}>无匹配结果</span>} />
              )
        } */}
        <Table
          dataSource={dataSources}
          columns={this.columns}
        />
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
          title={`评论文章-${commentArticlename}`}
          onOk={this.handleCommentOk}
          onCancel={this.handleCommentCancel}
          showOk={true}
          showCancel={true}
          // footer={footer}
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
          <CommentList />
        </Modal>
      </>
    )
  }
}

export default Form.create({ name: 'Tables' })(Tables);