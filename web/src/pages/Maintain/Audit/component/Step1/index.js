import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import FormElement from '@/components/FormElement';

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
                label="文章内容"
                field="articleContent"
              >
                <a>《三国演义》</a>
              </FormElement>
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

export default Form.create({name: 'Step1'})(Step1);