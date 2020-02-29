import React from 'react';
import { Form } from 'antd';
import FormElement from '@/components/FormElement';

class ManageDetail extends React.Component {
  render() {
    const { form } = this.props;
    const formElementProps = {
      form,
      width: 300,
    };
    const options = [{
      label: '管理员',
      value: '管理员'
    }, {
      label: '作者',
      value: '作者'
    }, {
      label: '用户',
      value: '用户'
    }]
    const currentUser = {
        username: 'daqing',
        nickname: 'zz',
        userType: '管理员',
        telphoneNumber: '12323232',
        email: '2295957879',
        decription: '23434'
    }
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
            field="telphoneNumber"
            type="mobile"
            initialValue={currentUser.telphoneNumber}
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
