import React, { Fragment } from 'react';
import { Button, Form, Card, Row, Col } from 'antd';
import QueryBar from '@/components/QueryBar';
import FormElement from '@/components/FormElement';
import FormRow from '@/components/FormRow';

class Science extends React.Component {
  state = {
    collapsed: false
  }

  render() {
    const { collapsed } = this.state;
    const { form } = this.props;
    const formElementProps = {
      form,
      width: 300,
      style: { paddingLeft: 16 },
    };
    return (
      <Row>
        <Col>
          <Card
            title={<span style={{ fontWeight: 'bold' }}>多关键词检索</span>}
          >
            <QueryBar
              collapsed={collapsed}
              onCollapsedChange={collapsed => this.setState({ collapsed })}
            >
              <Form onSubmit={this.handleSearch}>
                <FormRow>
                  <FormElement
                    {...formElementProps}
                    label="名称"
                    field="name"
                    ref={node => this.nameDom = node}
                  />
                  <FormElement
                    {...formElementProps}
                    type="select"
                    label="职位"
                    field="job"
                    options={[
                      { value: 1, label: 1 },
                      { value: 2, label: 2 },
                    ]}
                  />
                  <FormElement layout>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>添加用户</Button>
                  </FormElement>
                </FormRow>
              </Form>
            </QueryBar>

          </Card>
        </Col>
      </Row>

    )
  }
}

export default Form.create({ Science })(Science);