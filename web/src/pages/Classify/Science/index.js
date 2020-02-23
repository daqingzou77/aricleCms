import React, { Fragment } from 'react';
import { Button, Form } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import QueryBar from '@/components/QueryBar';


class Science extends React.Component {
  state = {
    collapsed: false
  }

  render() {
    const { form } = this.props;
    const { collapsed } = this.state;
    const formElementProps = {
      form,
      width: 300,
      style: { paddingLeft: 16 },
    };
    const queryBar = () => (
      <QueryBar
        collapsed={collapsed}
        onCollapsedChange={collapsed => this.setState({ collapsed })}
      >
        <Form onSubmit={this.handleSearch}>

        </Form>
      </QueryBar>
    )
    return (
      <PageHeaderWrapper
        content={queryBar}
      >

      </PageHeaderWrapper>

    )
  }
}

export default Science;