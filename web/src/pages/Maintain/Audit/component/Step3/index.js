import React from 'react';
import { Form, Button, Result, Descriptions, Statistic } from 'antd';
import styles from './style.less';


class Step3 extends React.Component {
  
 handleNextStep = key => {
   this.props.handleNextStep(key)
 }

 
 render() {
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
      <Button>查看详情</Button>
    </>
  )
    return (
      <Result
        status="success"
        title="审核通过"
        subTitle="即将发布在系统"
        extra={extra}
        className={styles.result}
      >
        {information}
      </Result>
    )
  } 
}

export default Form.create({name: 'Step3'})(Step3);