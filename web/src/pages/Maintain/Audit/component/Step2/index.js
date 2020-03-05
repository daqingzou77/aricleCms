import React from 'react';
import { Form, Alert, Button, Descriptions, Divider, Statistic } from 'antd';
import FormElement from '@/components/FormElement';
import {
  confirmAuditMessage
} from '@/services/auditService'
import styles from './style.less';

class Step2 extends React.Component {

  handleNextStep = key => {
    this.props.handleNextStep(key);
  }

  handleConfirm = articlename => {
    confirmAuditMessage({
      articlename,
      auditor: 'daqing'
    }, ({ data }) => {
       if(data.status) {
         this.handleNextStep(2)
       }
    }, 
    e => console.log('confirmAuditMessage-error', e.toString())
    )
  }


  render() {
    const { form, auditMessage } = this.props;
    const currentUser ='daqing';
    const { articlename, author, articleType, articleDescription } = auditMessage;
    let text;
    switch (articleType) {
      case 0: text = "科学"; break;
      case 1: text = "历史"; break;
      case 2: text = "文学"; break;
      case 3: text = "体育"; break;
      default: text = "";
    }
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="文章通过审核后，将会发布在系统中，无法撤回"
          style={{ marginBottom: 24 }}
        />
        <Alert
          closable
          showIcon
          message={<span>当前审核人：{currentUser}</span>}
          type="success"
          style={{ marginBottom: 24 }}
        />
        <Descriptions column={1}>
          <Descriptions.Item label="文章名"> {articlename}</Descriptions.Item>
          <Descriptions.Item label="作者"> {author}</Descriptions.Item>
          <Descriptions.Item label="文章类型"> {text}</Descriptions.Item>
          <Descriptions.Item label="文章简述"> {articleDescription}</Descriptions.Item>
          {/* <Descriptions.Item label="文章内容"> 第三章讲述了..</Descriptions.Item> */}
        </Descriptions>
        <Divider style={{ margin: '24px 0' }} />
        <FormElement style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={() => this.handleConfirm(articlename)}>
            提交
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            onClick={() => this.handleNextStep(0)}
          >
            取消
          </Button>
        </FormElement>
      </Form>
    )
  }
}

export default Form.create({ name: 'Step2' })(Step2);