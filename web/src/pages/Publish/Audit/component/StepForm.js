import React from 'react';
import { Card, Steps } from 'antd';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import styles from './style.less';

const { Step } = Steps;


class StepForm extends React.Component {
  
  state = {
    currentStep: 0
  }

  getCurrentStep() {
    const { current } = this.props;
      switch (current) {
        case 'info':
          return 0;
        case 'confirm':
          return 1;
        case 'result':
          return 2;
        default:
          return 0;
    }
  }

  handleNextStep = key => {
    this.setState({
      currentStep: key
    })
  };

  render() {
    const { currentStep } = this.state;
    let stepComponent;
    if (currentStep === 1) {
      stepComponent = <Step2 handleNextStep={this.handleNextStep} />;
    } else if (currentStep === 2) {
      stepComponent = <Step3 handleNextStep={this.handleNextStep} />;
    } else {
      stepComponent = <Step1 handleNextStep={this.handleNextStep} />;
    }

    return(
      <Card bordered={false}>
        <>
          <Steps current={currentStep} className={styles.steps}>
            <Step title="填写审核信息" />
            <Step title="确认审核内容" />
            <Step title="完成审核" />
          </Steps>
          {stepComponent}
        </>
      </Card>
    )
  }
}

export default StepForm;
