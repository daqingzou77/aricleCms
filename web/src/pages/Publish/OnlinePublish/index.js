import React from 'react';
import { Card, Button, Input, Icon } from 'antd'; 
import { Editor } from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Modal from '@/common/components/Modal';
import styles from './styles.less';

class PublishOnline extends React.Component {
  state = {
    showRichText: false,
    editorContent: '',
    editorState: ''
  }

  // 新增章节内容
  handleAddSection

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
    return (
      <div className={styles.publishOnLine}>
        <Card>
          <Button type="dashed" icon="plus-circle" style={{ marginLeft: 15 }} onClick={this.handleAddSection}>新增章节</Button>
          <Button type="danger" icon="minus-circle" onClick={this.handleClearContent} style={{ marginLeft: 15 }}>清空内容</Button>
          <Button type="primary" icon="folder" onClick={this.handleGetText} style={{ float: 'right' }}>历史章节</Button>
        </Card>
        <Card 
          title={<span style={{ fontWeight: 'bold'}}>三国演义</span>}
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