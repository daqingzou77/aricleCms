import React from 'react';
import { Form } from 'antd';
import FormElement from '@/components/FormElement';

class ManageDetai extends React.Component {
  render () {
    const { form } = this.props;
    const FormElementProps = {
      form,
      width: 300
    }
    const plainOptions = ['已发布', '撤销'];
    return (
      <div style={{ padding: 10 }}>
        <Form>
          <FormElement 
            label="文章名称"
            field="articlename"
            {...FormElementProps}
          />
          <FormElement 
            label="文章作者"
            field="author"
            {...FormElementProps}
          />     
          <FormElement 
            label="文章状态"
            field="status"
            type="radio-group"
            options={plainOptions}
            initialValue={"已发布"}
            form={this.props.form}
          />         
        </Form>
      </div>   
    )
  }
}

export default Form.create({name: 'MangeDetail'})(ManageDetai);