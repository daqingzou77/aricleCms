import React from 'react';
import { Table } from 'antd';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Modal from '@/common/components/Modal';
import {
  downloadAnnex
} from '@/services/annexService'

export default class Tables extends React.Component {
 
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
    title: "文章内容",
    datIndex: 'articleContent',
    render: (_, record) => {
      const { articleForm, annexname, articlename, articleContent } = record;
      return   (
        <a onClick={() => this.handleClick(annexname, articleForm, articleContent )}>{articleForm === 0 ? articlename : annexname}</a>
      )
    }
  }];

  state = {
    visible: false,
    editorState: ''
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

  render() {
    const { loading, dataSource } = this.props;
    const { editorState, visible } = this.state;
    return (
      <>
        <Table 
          dataSource={dataSource}
          loading={loading}
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
            onEditorStateChange={this.onEditorStateChange}
          />
        </Modal>
      </> 
    )
  }
}