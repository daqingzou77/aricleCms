import React from 'react';
import { Form, Button, Result, Descriptions } from 'antd';
import styles from './style.less';


class Step3 extends React.Component {

  state = {
    visible: false,
    required: true,
  }

  handleNextStep = key => {
    this.props.handleNextStep(key, true)
  }

  handleShowDetail = () => {
    this.setState({
      visible: true
    })
  }

  closeCard = () => {
    this.props.closeCard();
  }

  render() {
    const currentUser = 'daqing';
    const { auditMessage } = this.props;
    const { articlename, author, articleType, articleDescription } = auditMessage;
    let text;
    switch (articleType) {
      case 0: text = "科学"; break;
      case 1: text = "历史"; break;
      case 2: text = "文学"; break;
      case 3: text = "体育"; break;
      default: text = "";
    }
    const information = (
      <div className={styles.information}>
        <Descriptions column={1}>
          <Descriptions.Item label="文章名"> {articlename}</Descriptions.Item>
          <Descriptions.Item label="作者"> {author}</Descriptions.Item>
          <Descriptions.Item label="文章类型"> {text}</Descriptions.Item>
          <Descriptions.Item label="文章简述"> {articleDescription}</Descriptions.Item>
        </Descriptions>
      </div>
    );

    const extra = (
      <>
        <Button type="dashed" onClick={() => this.closeCard()}>
          退出审核
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