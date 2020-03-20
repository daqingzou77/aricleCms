import React from 'react';
import { Form, Button, Row, Col, message } from 'antd';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, ContentState } from 'draft-js';
import FormElement from '@/components/FormElement';
import ContentModal from '@/components/ContentModal';
import {
  downloadAnnex
} from '@/services/annexService'
import Modal from '@/common/components/Modal';
import {
  pushAuditMessage
} from '@/services/auditService'
import styles from './style.less';

class Step1 extends React.Component {

  state = {
    visible: false,
    editorState: ''
  }

  handleNextStep = () => {
    this.pushAuditMessage();
  }

  pushAuditMessage = () => {
    const { auditMessage: { articlename }, handleNextStep } = this.props;
    const auditor = localStorage.getItem('currentUser');
    pushAuditMessage({
      articlename,
      auditor
    }, ({ data }) => {
      if (data.status) {
        handleNextStep(1);
      } else {
        message.error('审核失败！')
      }
    }, e => console.log('pushAuditMessage-error', e.toString()))
  }

  handleClick = (articleForm, name, articleContent) => {
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
    const { form, auditMessage, } = this.props;
    const { visible, editorState } = this.state;
    const { articlename, author, articleType, articleForm, articleDescription, annexname, articleContent } = auditMessage;
    const content = annexname !== '' ? annexname : articlename;
    const formElementProps = {
      form,
      width: 400
    };
    const selectOptions = [
      {
        label: '科学',
        value: 0,
      }, {
        label: '历史',
        value: 1,
      }, {
        label: '文学',
        value: 2,
      }, {
        label: '体育',
        value: 3
      }
    ];
    const formOptions = [
      {
        label: '在线发布',
        value: 0,
      }, {
        label: '文件上传',
        value: 1,
      }
    ];
    return (
      <>
        <Row type="flex" justify="space-around" align="middle">
          <Col>
            <Form>
              <FormElement
                {...formElementProps}
                label="文章名称"
                field="articlename"
                initialValue={articlename}
                disabled={articlename}
              />
              <FormElement
                {...formElementProps}
                label="文章作者"
                field="author"
                initialValue={author}
                disabled={author}
              />
              <FormElement
                {...formElementProps}
                label="文章类型"
                type="select"
                field="articleType"
                options={selectOptions}
                initialValue={typeof articleType === 'number' ? articleType : undefined}
                disabled={typeof articleType === 'number'}
              />
              <FormElement
                {...formElementProps}
                label="文章简述"
                type="textarea"
                field="articleDescription"
                rows={2}
                initialValue={articleDescription}
                disabled={articleDescription}
              />
              <FormElement
                {...formElementProps}
                label="文章形式"
                field="articleForm"
                type="select"
                options={formOptions}
                initialValue={typeof articleForm === 'number' ? articleForm : undefined}
                disabled={typeof articleForm === 'number'}
              />
              <div className={styles.fontStyle}>
                <FormElement>
                  <span>{articleForm === 1 ? "附件名称" : "文章内容"}</span>
                  <a onClick={() => this.handleClick(articleForm, content, articleContent)}>{content}</a>
                </FormElement>
              </div>
              <FormElement style={{ textAlign: 'center' }}>
                <Button type="primary" onClick={this.handleNextStep}>下一步</Button>
              </FormElement>
            </Form>
          </Col>
        </Row>
        <Modal
          visible={visible}
          title="内容详情"
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
          <ContentModal editorState={editorState} />
        </Modal>
      </>
    )
  }
}

export default Form.create({ name: 'Step1' })(Step1);