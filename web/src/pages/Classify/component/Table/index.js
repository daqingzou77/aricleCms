/* eslint-disable no-nested-ternary */
import React from 'react';
import { Table, Spin, Empty, Tag, message, Form } from 'antd';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import FormElement from '@/components/FormElement';
import Modal from '@/common/components/Modal';
import {
  downloadAnnex
} from '@/services/annexService';
import styles from './style.less';

const { CheckableTag } = Tag;

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
          <CheckableTag color="#2db7f5" checked={choose1Index.includes(index)} onChange={() => that.handleArticle(articlename, 1, index)}>点赞</CheckableTag>
          <CheckableTag color="#000" checked={choose2Index.includes(index)} onChange={() => that.handleArticle(articlename, 2, index)}>拉黑</CheckableTag>
          <CheckableTag color="#87d068" checked={choose3Index.includes(index)} onChange={() => that.handleArticle(articlename, 3, index)}>收藏</CheckableTag>
          <CheckableTag color="#f50" checked={choose4Index.includes(index)} onChange={() => that.handleArticle(articlename, 4, index)}>评论</CheckableTag>
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

  handleArticle = (articlename, key, index) => {
    const { choose1Index, choose2Index, choose3Index, choose4Index } = this.state;
    if (key === 1) {
      if (choose1Index.includes(index)) {
        choose1Index.splice(choose1Index.indexOf(index), 1);
        message.success('取消点赞成功');
      } else {
        message.success('点赞成功');
        choose1Index.push(index);
        choose2Index.splice(choose2Index.indexOf(index), 1);
      }
      this.setState({
        choose1Index,
        choose2Index
      })
    } else if (key === 2) {
      if (choose2Index.includes(index)) {
        choose2Index.splice(choose2Index.indexOf(index), 1);
        message.success('取消拉黑成功');
      } else {
        message.success('拉黑成功');
        choose2Index.push(index);
        choose1Index.splice(choose1Index.indexOf(index), 1);
      }
      this.setState({
        choose2Index,
        choose1Index
      })
    } else if (key === 3) {
      if (choose3Index.includes(index)) {
        choose3Index.splice(choose3Index.indexOf(index), 1);
        message.success('取消收藏成功');
      } else {
        message.success('收藏成功');
        choose3Index.push(index);
      }
      this.setState({
        choose3Index
      })
    } else if (key === 4) {
      if (choose4Index.includes(index)) {
        choose4Index.splice(choose4Index.indexOf(index), 1);
        message.success('取消评论成功')
        this.setState({
          commentModalVisible: false
        })
      } else {
        choose4Index.push(index);
        this.setState({
          commentModalVisible: true,
          commentIndex: index,
          commentArticlename: articlename
        })
      }
      this.setState({
        choose4Index
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
    this.setState({
      commentModalVisible: false
    })
    message.success('评论成功')
  }

  handleCommentCancel = () => {
    const { commentIndex, choose4Index } = this.state;
    choose4Index.splice(choose4Index.indexOf(commentIndex), 1);
    this.setState({
      commentModalVisible: false,
      choose4Index
    })
    message.success('评论取消失败')
  }

  render() {
    const { loading, dataSource, form } = this.props;
    const { editorState, visible, commentModalVisible, commentIndex, commentArticlename } = this.state;
    const dataSources = [{
      articlename: '水浒'
    }, {
      articlename: '三国'
    }]
    const formElementProps = {
      form,
      width: 300
    }
    return (
      <>
        {
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
          title={`评论文章-${commentArticlename}`}
          onOk={this.handleCommentOk}
          onCancel={this.handleCommentCancel}
          showOk={true}
          showCancel={true}
          okText="确认"
          cancelText="取消"
        >
          <Form style={{ padding: 10 }}>
            <FormElement 
              {...formElementProps}
              field="comment"
              label=""
              type="textarea"
              placeholder="请输入评论内容..."
              rows={5}
            />
          </Form>
        </Modal>
      </>
    )
  }
}

export default Form.create({ name: 'Tables'})(Tables);