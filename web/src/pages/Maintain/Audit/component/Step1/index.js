import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import FormElement from '@/components/FormElement';
import styles from './style.less';

class Step1 extends React.Component {

  handleNextStep = () => {
    this.props.handleNextStep(1);
  }

  render() {
    const { form } = this.props;
    const formElementProps = {
      form,
      width: 400
    };
    const articleForm = 1;
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
    return (
      <>
        <Row type="flex" justify="space-around" align="middle">
          <Col>
            <Form>
              <FormElement
                {...formElementProps}
                label="文章名称"
                field="articlename"
              />
              <FormElement
                {...formElementProps}
                label="文章作者"
                field="author"
              />
              <FormElement
                {...formElementProps}
                label="文章类型"
                type="select"
                field="articleType"
                options={selectOptions}
              />
              <FormElement
                {...formElementProps}
                label="文章简述"
                type="textarea"
                field="articleDescription"
                rows={2}
              />
              <FormElement
                {...formElementProps}
                label="文章形式"
                field="articleForm"
                options={selectOptions}
              />
              <div className={styles.fontStyle}>
                <FormElement>
                  <span>{articleForm === 0 ? "文章内容" : "附件名称"}</span>
                </FormElement>
              </div>
              <FormElement style={{ textAlign: 'center' }}>
                <Button type="primary" onClick={this.handleNextStep}>下一步</Button>
              </FormElement>
            </Form>
          </Col>
        </Row>
      </>
    )
  }
}

export default Form.create({ name: 'Step1' })(Step1);