import React from 'react';
import { Form } from 'antd';
import FormElement from '@/components/FormElement';

class ManageDetail extends React.Component {
  render() {
    const { form, currentUser } = this.props;
    const formElementProps = {
      form,
      width: 300,
    };
    const options = [{
      label: '用户',
      value: 0
    }, {
      label: '作者',
      value: 1
    }, {
      label: '管理员',
      value: 2
    }]
    return (
      <div style={{ padding: 20 }}>
        <Form>
          <FormElement 
            {...formElementProps}
            label="用户名称"
            field="username"
            initialValue={currentUser.username}
          />
          <FormElement 
            {...formElementProps}
            label="用户昵称"
            field="nickname"
            initialValue={currentUser.nickname}
          /> 
          <FormElement 
            {...formElementProps}
            label="用户类型"
            field="userType"
            type="select"
            options={options}
            initialValue={currentUser.userType}
          /> 
          <FormElement 
            {...formElementProps}
            label="用户号码"
            field="telephoneNumber"
            type="mobile"
            initialValue={currentUser.telephoneNumber}
          /> 
          <FormElement 
            {...formElementProps}
            label="用户邮箱"
            field="email"
            type="email"       
            initialValue={currentUser.email}
          /> 
          <FormElement 
            {...formElementProps}
            label="用户描述"
            field="decription"
            type="textarea"
            initialValue={currentUser.decription}
            rows={5}
          /> 
        </Form>
      </div>
    )
  }
}

export default Form.create({name: 'ManageDetail'})(ManageDetail)
