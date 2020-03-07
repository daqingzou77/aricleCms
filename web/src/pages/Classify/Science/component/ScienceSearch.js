import React, { Fragment } from 'react';
import { Button, Card, Form, Icon } from 'antd';
import QueryBar from '@/components/QueryBar';
import FormElement from '@/components/FormElement';
import FormRow from '@/components/FormRow';

class ScienceSearch extends React.Component {

  id = 0;

  state = {
    collapsed: true
  }  

  handleOnRemove = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 0) {
      return;
    };
    form.setFieldsValue({
      keys: keys.slice(1),
    });
  };

  handleOnAdd = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(this.id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleOnCollapseChange = collapsed => {
    const { form } = this.props;
    this.id = 0;
    this.setState({
      collapsed
    });
    form.setFieldsValue({
      keys: [],
    });
  }

  handleOnQuery = () => {
    this.props.handleOnQuery();
  }

  handleReset = () => {
    this.props.handleReset();
    this.setState({
      collapsed: true
    })
  }

  render() {
    const { collapsed } = this.state;
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formElementProps = {
      form,
      width: 300,
      style: { paddingLeft: 16 },
    };
    const formItems = keys.map((value, index) => (
      <div>
        <FormElement
          key={`keywords${7 + index}`}
          {...formElementProps}
          label={`关键词${7 + index}`}
          field={`keyword${7 + index}`}
        />
      </div>
    ))
    return (
      <Card
        title={<span style={{ fontWeight: 'bold' }}>多关键词检索</span>}
        extra={
          <span 
            style={{ fontWeight: 'bold', cursor: 'pointer' }} 
            onClick={this.handleReset}
          >
            <Icon type="delete" /> 重置
          </span>}
      >
        <QueryBar
          collapsed={collapsed}
          onCollapsedChange={collapsed => this.handleOnCollapseChange(collapsed)}
        >
          <Form onSubmit={this.handleSearch} autoComplete="off">
            <FormRow>
              <FormElement
                {...formElementProps}
                label="关键词1"
                field="keyword1"
                ref={node => this.nameDom = node}
                required
              />
              <FormElement
                {...formElementProps}
                label="关键词2"
                field="keyword2"
              />
              <FormElement
                {...formElementProps}
                label="关键词3"
                field="keyword3"
              />
              {collapsed ? null : (
                <Fragment>
                  <FormElement
                    {...formElementProps}
                    label="关键词4"
                    field="keyword4"
                  />
                  <FormElement
                    {...formElementProps}
                    label="关键词5"
                    field="keyword5"
                  />
                  <FormElement
                    {...formElementProps}
                    label="关键词6"
                    field="keyword6"
                  />
                </Fragment>
                    )}
              {formItems}
              {collapsed ? null : (
                <div>
                  <FormElement>
                    <Button
                      type="dashed"
                      icon="plus-circle"
                      style={{ marginLeft: 15 }}
                      onClick={this.handleOnAdd}
                    >
                      添加
                    </Button>
                    <Button
                      type="danger"
                      icon="minus-circle"
                      style={{ marginLeft: 20, display: keys.length > 0 ? 'inline' : 'none' }}
                      onClick={() => this.handleOnRemove()}
                    >
                      删除
                    </Button>
                  </FormElement>
                </div>)}
              <FormElement>
                <Button
                  type="primary"
                  icon="search"
                  style={{ marginLeft: 20 }}
                  onClick={this.handleOnQuery}
                >
                  查询
                </Button>
              </FormElement>
            </FormRow>
          </Form>
        </QueryBar>
      </Card>
    ) 
  }
}

export default ScienceSearch