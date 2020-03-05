/* eslint-disable no-restricted-syntax */
import React from 'react';
import { Card, Button, Input, Icon, Table, Badge, Form, message, Popover, Tag } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import CustomizeEmpty from '@/components/CustomizeEmpty';
import Modal from '@/common/components/Modal';
import AddModal from './component/AddModal';
import UploadModal from './component/UploadModal';
import {
  saveArticleRecord,
  publishArticle,
  getEditRecord,
  getArticleDetail,
  getPublishedArtilces
} from '@/services/publishService'
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
    dataIndex: 'articleDescription',
  }, {
    title: '文章形式',
    dataIndex: 'articleForm',
    render: (_, record) => (
      <span>{record.articleForm === 0 ? '在线发布' : '附件上传'}</span>
    )
  }, {
    title: '文章状态',
    dataIndex: 'status',
    render: () => (
      <span>
        <Badge status="warning" />
        已发布
      </span>
    ),
  }, {
    title: '发布时间',
    dataIndex: 'publishTime',
    render: (_, record) => (
      <span>{moment(record.create).format('YYYY-MM-DD hh:mm:ss')}</span>
    )
  }]

  state = {
    required: true,
    loading: true,
    editorState: '',
    dataSource: [],
    editRecord: [],
    addModalVisible: false,
    uploadModalVisble: false,
    currentName: '',
    currentAuthor: '',
    currentType: '',
  }

  componentDidMount() {
    this.getPublishedArtilces();
    this.getEditRecord();
  }

  // 获取已发布文章列表
  getPublishedArtilces = () => {
    getPublishedArtilces({}, ({ data }) => {
      this.setState({
        dataSource: data,
        loading: false
      })
    },
      e => console.log('getPublishedArtilces-error', e.toString())
    )
  }

  // 获取编辑记录
  getEditRecord = () => {
    getEditRecord({}, ({ data }) => {
      this.setState({
        editRecord: data
      })
    },
      e => console.log('getEditRecord-error', e.toString())
    )
  }

  // 保存文章编辑
  handleSaveEdit = () => {
    const { editorState, currentName, currentType, currentAuthor } = this.state;
    console.log('currentName', currentName);
    if (editorState && currentName) {
      saveArticleRecord({
        editTitle: currentName,
        editAuthor: currentAuthor,
        editType: currentType,
        editContent: draftToHtml(convertToRaw(editorState.getCurrentContent()))
      }, ({ data }) => {
        this.getEditRecord();
        message.success('保存编辑成功！');
      },
        e => console.log('saveArticleRecord-error', e.toString())
      )
    } else {
      message.warning('请补充文章必要内容！')
    }

  }

  // 新增章节内容弹窗
  handleAddArticle = () => {
    this.setState({
      addModalVisible: true,
      editorState: ''
    })
  }

  handleArticleOk = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { articlename, author, articleType } = values
        this.setState({
          addModalVisible: false,
          currentName: articlename,
          currentAuthor: author,
          currentType: articleType,
        })
      }
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
    const { form } = this.props;
    const { editorState } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        const { articlename, author, articleType, articleDescription, ...keyword } = values;
        const keywords = [];
        for (let obj in keyword) {
          keywords.push(keyword[obj]);
        }
        publishArticle({
          articlename,
          author,
          articleType,
          articleForm: 0,
          status: 1,
          articleDescription,
          articleContents: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          keywords
        }, ({ data }) => {
          if (data.length === 0) {
            message.error('该文章已存在！');
          } else {
            message.success('文章发布成功！');
            this.getPublishedArtilces();
          }
          this.setState({
            uploadModalVisble: false,
            currentName: '',
            currentType: '',
            currentAuthor: '',
            editorState: ''
          })
        },
          e => console.log('publishArticle-error', e.toString())
        )
      }
    })
  }

  // 清空文本
  handleClearContent = () => {
    this.setState({
      editorState: '',
      currentName: '',
      currentAuthor: '',
      currentType: ''
    })
  }

  // 编辑器的状态
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    })
  }


  // 回复原先版本
  revokeVersion = (editTitle, editTime) => {
    getArticleDetail({
      editTitle,
      editTime
    }, ({ data }) => {
      console.log('getArticleDetail-data', data);
      const contentBlock = htmlToDraft(data.editContent);
      console.log('contentBlock', contentBlock);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      console.log('contentState', contentState);
      const editorState = EditorState.createWithContent(contentState);
      console.log('editorState', editorState);
      this.setState({
        editorState,
        currentName: data.editTitle,
        currentType: data.editType,
        currentAuthor: data.editAuthor
      });
    },
      e => console.log('getArticleDetail-error', e.toString())
    )
  }

  refresh = () => {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.getPublishedArtilces();
    }, 1000)
  }

  render() {
    const { required, loading, editorState, dataSource, editRecord, addModalVisible, uploadModalVisble, currentName, currentAuthor, currentType } = this.state;
    const { form } = this.props;
    let type;
    switch (currentType) {
      case 0: type = '科学'; break;
      case 1: type = '历史'; break;
      case 2: type = '文学'; break;
      case 3: type = '体育'; break;
      default: type = '';
    }

    let content;
    if (editRecord.length > 0) {
      content = (
        <div style={{ height: 220, width: 220, overflow: 'auto' }}>
          <InfiniteScroll>
            {editRecord.map(item => {
              const { editTitle, editTime } = item;
              return (
                <p><a onClick={() => this.revokeVersion(editTitle, editTime)}>{moment(editTime).format('YYYY-MM-DD hh:mm:SS')}--{editTitle}</a></p>
              )
            })}
          </InfiniteScroll>
        </div>
      )
    }

    return (
      <div className={styles.publishOnLine}>
        <Card>
          <Button type="ghost" icon="plus-circle" style={{ marginLeft: 15 }} onClick={this.handleAddArticle}>新增文章</Button>
          <Button type="dashed" icon="save" style={{ marginLeft: 15 }} onClick={this.handleSaveEdit}>保存编辑</Button>
          <Button type="danger" icon="minus-circle" onClick={this.handleClearContent} style={{ marginLeft: 15 }}>清空编辑</Button>
          <Button type="primary" icon="upload" style={{ marginLeft: 15 }} onClick={this.handleUploadModal}>文章上传</Button>
        </Card>
        <Card
          title={<span style={{ fontWeight: 'bold' }}>文章编辑{currentName ? `---${type}` : null}</span>}
          extra={
            <Popover placement="bottom" title="记录详情" content={content} trigger="click">
              <span style={{ color: '#2884D8', cursor: 'pointer' }}>
                <Icon type='bars' /> 编辑记录
              </span>
            </Popover>
          }
        >
          <div className={styles.sectionName}>
            文章名称： <Input value={currentName} disabled style={{ width: 300, marginRight: 15 }} />
            文章作者： <Input value={currentAuthor} disabled style={{ width: 300 }} />
          </div>
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          />
        </Card>
        <Card
          title={<span style={{ fontWeight: 'bold' }}>已发布文章</span>}
          style={{ marginTop: 10 }}
          extra={<div style={{ color: '#2884D8', cursor: 'pointer' }} onClick={this.refresh}><Icon type='reload' />&nbsp;刷新</div>}
        >
          <CustomizeEmpty>
            <Table
              className="components-table-demo-nested"
              columns={this.columns}
              loading={loading}
              dataSource={dataSource}
              rowKey="id"
              expandedRowRender={record => (
                <div style={{ margin: 0, textAlign: 'left' }}>
                  {record.keywords.map((item, index) => {
                    return (
                      <span>关键词{index + 1}：<Tag>{item}</Tag></span>
                    )
                  })}
                </div>
              )}
            />
          </CustomizeEmpty>
        </Card>
        <Modal
          title="新增文章"
          visible={addModalVisible}
          showOk={required}
          showCancel={required}
          onOk={this.handleArticleOk}
          onCancel={this.handleArticleCancel}
        >
          <AddModal form={form} />
        </Modal>
        <Modal
          title="文章上传"
          visible={uploadModalVisble}
          showOk={required}
          showCancel={required}
          onOk={this.handleUploadOk}
          onCancel={this.handleUploadCancel}
        >
          <UploadModal form={form} currentName={currentName} currentAuthor={currentAuthor} currentType={currentType} />
        </Modal>
      </div>
    )
  }
}

export default Form.create({ name: 'PublishOnline' })(PublishOnline);