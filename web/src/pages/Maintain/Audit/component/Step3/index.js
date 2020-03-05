import React from 'react';
import { Form, Button, Result, Descriptions } from 'antd';
import styles from './style.less';


class Step3 extends React.Component {

  state = {
    visible: false,
    required: true,
  }

  handleNextStep = key => {
    this.props.handleNextStep(key)
  }

  handleShowDetail = () => {
    this.setState({
      visible: true
    })
  }

  render() {
    const currentUser = 'daqing';
    const information = (
      <div className={styles.information}>
        <Descriptions column={1}>
          <Descriptions.Item label="文章名"> 水浒传</Descriptions.Item>
          <Descriptions.Item label="作者"> 施耐庵</Descriptions.Item>
          <Descriptions.Item label="文章详情"> 第三章第二小节</Descriptions.Item>
          <Descriptions.Item label="文章内容"> 第三章讲述了..</Descriptions.Item>
        </Descriptions>
      </div>
    );

    const extra = (
      <>
        <Button type="primary" onClick={() => this.handleNextStep(0)}>
          继续审核
        </Button>
      </>
    )
    return (
      <>
        <Result
          status="success"
          title="审核通过"
          subTitle={<p>审核人-<span style={{ fontWeight: 'bold' }}>{currentUser}</span></p>}
          extra={extra}
          className={styles.result}
        >
          {information}
        </Result>
      </>
    )
  }
}

export default Form.create({ name: 'Step3' })(Step3);