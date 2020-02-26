import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import FormElement from '@/components/FormElement';

class Step1 extends React.Component {
  render() {
    const { form } = this.props;
    const formElementProps = {
      form,
      width: 400
    };

    return (
      <>
        <Row type="flex" justify="space-around" align="middle">
          <Col>
            <Form>
              <FormElement 
                {...formElementProps}
                label="文章名"
                field="articlename"
              />
              <FormElement 
                {...formElementProps}
                label="文章作者"
                field="author"
              />
              <FormElement 
                {...formElementProps}
                label="文章内容"
                field="articleContent"
              />
              <FormElement style={{ textAlign: 'center' }}>
                <Button type="primary">下一步</Button>
              </FormElement>
            </Form>    
          </Col>
        </Row>
      </>
    )
  }
}

export default Form.create({name: 'Step1'})(Step1);