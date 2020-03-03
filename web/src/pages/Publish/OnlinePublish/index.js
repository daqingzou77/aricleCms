import React from 'react';
import { Card, Button, Input, Icon, Table, Badge, Form, message, Popover, Tag } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import Modal from '@/common/components/Modal';
import AddModal from './component/AddModal';
import UploadModal from './component/UploadModal';
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
    title: '文章简述',
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
    title: '发布时间',
    dataIndex: 'createTime',
  }]

  state = {
    showRichText: false,
    editorContent: '',
    editorState: '',
    addModalVisible: false,
    uploadModalVisble: false,
  }

  // 保存文章编辑
  handleSaveEdit = () => {
    const { blocks } = this.state.editorContent;
    console.log(this.state.editorContent);
    this.setState({
      content: this.state.editorContent
    })
    message.success('保存编辑成功！');
  }

  // 新增章节内容弹窗
  handleAddArticle = () => {
    this.setState({
      addModalVisible: true
    })
  }

  handleArticleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { articlename, author, ...keywords } = values
        console.log('keywords', keywords);
      }
    })
    this.setState({
      addModalVisible: false
    })
  }

  handleArticleCancel = () => {
    this.setState({
      addModalVisible: false
    })
  }

  // 上传弹窗显示
  handleUploadModal = () => {
    this.setState({
      uploadModalVisble: true
    })
  }

  handleUploadCancel = () => {
    this.setState({
      uploadModalVisble: false
    })
  }

  handleUploadOk = () => {
    this.setState({
      uploadModalVisble: false
    })
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
    console.log('editorState', editorState);
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

  // 回复原先版本
  revokeVersion = () => {
  }

  render() {
    const { editorState, editorContent, showRichText, addModalVisible, uploadModalVisble } = this.state;
    const { form } = this.props;
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

    const content = (
      <InfiniteScroll style={{ height: 100, overFlow: 'auto' }}>
        <p><a onClick={this.revokeVersion}>2019-12-17 16:30:12--《三国演义》</a></p>
        <p><a>2020-01-03 16:30:12--《水浒转》</a></p>
        <p><a>2020-01-03 16:30:12--《水浒转》</a></p>
        <p><a>2020-01-03 16:30:12--《水浒转》</a></p>
      </InfiniteScroll>
    )

    const keys = ['key1', 'key2', 'key3'];
    return (
      <div className={styles.publishOnLine}>
        <Card>
          <Button type="ghost" icon="plus-circle" style={{ marginLeft: 15 }} onClick={this.handleAddArticle}>新增文章</Button>
          <Button type="dashed" icon="save" style={{ marginLeft: 15 }} onClick={this.handleSaveEdit}>保存编辑</Button>
          <Button type="danger" icon="minus-circle" onClick={this.handleClearContent} style={{ marginLeft: 15 }}>清空编辑</Button>
          <Button type="primary" icon="upload" style={{ marginLeft: 15 }} onClick={this.handleUploadModal}>文章上传</Button>
        </Card>
        <Card
          title={<span style={{ fontWeight: 'bold' }}>三国演义</span>}
          extra={
            <Popover placement="bottom" title="记录详情" content={content} trigger="click">
              <span style={{ color: '#2884D8', cursor: 'pointer' }}>
                <Icon type='bars' /> 编辑记录
              </span>
            </Popover>
          }
        >
          <div className={styles.sectionName}>
            文章名： <Input value="三国演义" disabled style={{ width: 300 }} />
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
          title={<span style={{ fontWeight: 'bold' }}>已发布文章</span>}
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
                {keys.map((item, index) => {
                  return (
                    <span>关键词{index + 1}：<Tag>{item}</Tag></span>
                  )
                })}
              </div>
            )}
          />
        </Card>
        {/* <Modal
          title=""
          visible={uploadModalVisble}
          onCancel={() => {
            this.setState({
              showRichText: false
            })
          }}
          footer={null}
        >
          {draftjs(editorContent)}
        </Modal> */}
        <Modal
          title="新增文章"
          visible={addModalVisible}
          showOk={true}
          showCancel={true}
          onOk={this.handleArticleOk}
          onCancel={this.handleArticleCancel}
        >
          <AddModal form={form} />
        </Modal>
        <Modal
          title="文章上传"
          visible={uploadModalVisble}
          showOk={true}
          showCancel={true}
          onOk={this.handleUploadOk}
          onCancel={this.handleUploadCancel}
        >
          <UploadModal form={form} />
        </Modal>
      </div>
    )
  }
}

export default Form.create({ name: 'PublishOnline' })(PublishOnline);