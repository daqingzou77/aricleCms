import React from 'react';
import { Form, Alert, Button, Descriptions, Divider, Statistic } from 'antd';
import FormElement from '@/components/FormElement';
import styles from './style.less';

class Step2 extends React.Component {

  handleNextStep = key => {
    this.props.handleNextStep(key);
  }

  render() {
    const { form } = this.props;
    const formElementProps = {
      form,
      width: 300
    }
    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="文章通过审核后，将会发布在系统中，无法撤回"
          style={{ marginBottom: 24 }}
        />
        <Descriptions column={1}>
          <Descriptions.Item label="文章名"> 水浒传</Descriptions.Item>
          <Descriptions.Item label="作者"> 施耐庵</Descriptions.Item>
          <Descriptions.Item label="文章详情"> 第三章第二小节</Descriptions.Item>
          <Descriptions.Item label="文章内容"> 第三章讲述了..</Descriptions.Item>
        </Descriptions>
        <Divider style={{ margin: '24px 0' }} />
        <FormElement style={{ textAlign: 'center'}}>
          <Button
            style={{ marginRight: 10 }} 
            onClick={() => this.handleNextStep(0)}
          >
            上一步
          </Button>
          <Button type="primary" onClick={()=> this.handleNextStep(2)}>
            提交
          </Button>
        </FormElement>
      </Form>       
    )
  }
}

export default Form.create({name: 'Step2'})(Step2);