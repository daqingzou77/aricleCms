import React from 'react';
import { Card, Button, Input, Icon, Table, Badge } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import moment from 'moment';
import Modal from '@/common/components/Modal';
import styles from './styles.less';

class PublishOnline extends React.Component {

  columns = [{
    title: '文章名',
    dataIndex: 'articlename',
  }, {
    title: '作者',
    dataIndex: 'author',
  }, {
    title: '文章类型',
    dataIndex: 'articleType',
  }, {
    title: '文章描述',
    dataIndex: 'ariticleDescription',
  }, {
    title: '文章状态',
    dataIndex: 'status',
    render: () => (
      <span>
        <Badge status="success" />
        已发布
      </span>
    ),
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
  }]

  state = {
    showRichText: false,
    editorContent: '',
    editorState: ''
  }


  // 新增章节内容
  handleAddSection = () => {

  }

  // 清空文本
  handleClearContent = () => {
    this.setState({
      editorState: ''
    })
  }

  // 获取文本内容
  handleGetText = () => {
    this.setState({
      showRichText: true
    })
  }

  // 编辑器的状态
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }

  // 编辑器内容的状态
  onEditorChange = (editorContent) => {
    this.setState({
      editorContent
    })
  }

  render() {
    const { editorState, editorContent, showRichText } = this.state;
    const dataSource = [];
    for (let i = 0; i < 23; i++) {
      dataSource.push({
        articlename: `水浒绪论${i + 1}`,
        author: '施耐庵',
        articleType: '小说',
        ariticleDescription: '本章节..',
        createTime: moment(new Date).format('YYYY-MM-DD hh:mm:ss')
      })
    }

    return (
      <div className={styles.publishOnLine}>
        <Card>
          <Button type="dashed" icon="plus-circle" style={{ marginLeft: 15 }} onClick={this.handleAddSection}>新增章节</Button>
          <Button type="danger" icon="minus-circle" onClick={this.handleClearContent} style={{ marginLeft: 15 }}>清空内容</Button>
          <Button type="primary" icon="upload" style={{ marginLeft: 15 }}>章节上传</Button>
          <Button type="primary" icon="folder" onClick={this.handleGetText} style={{ float: 'right' }}>历史章节</Button>
        </Card>
        <Card
          title={<span style={{ fontWeight: 'bold' }}>三国演义</span>}
          extra={<span style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='bars' /> 编辑记录</span>}
        >
          <div className={styles.sectionName}>
            章节名： <Input value="第三章第二节" disabled style={{ width: 300 }} />
          </div>
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onEditorChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          />
        </Card>
        <Card
          title={<span style={{ fontWeight: 'bold' }}>发布内容</span>}
          style={{ marginTop: 10 }}
          extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;刷新</div>}
        >
          <Table
            className="components-table-demo-nested"
            columns={this.columns}
            dataSource={dataSource}
            rowKey="id"
            expandedRowRender={record => (
              <div style={{ margin: 0, textAlign: 'left' }}>
                <p>
                  <span>
                    章节： section1
                  </span>
                  &nbsp; &nbsp;
                  <span>
                    状态：  <Badge status="success" /> 已发布
                  </span>
                  &nbsp; &nbsp;
                  <span>
                    章节时间： {moment(new Date()).format('YYYY/MM/DD hh:mm:ss')}
                  </span>
                  &nbsp; &nbsp;
                  <span>
                    章节内容： daqing
                  </span>
                </p>
              </div>
            )}
          />
        </Card>
        <Modal
          title="富文本"
          visible={showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            })
          }}
          footer={null}
        >
          {draftjs(editorContent)}
        </Modal>
      </div>
    )
  }
}

export default PublishOnline;