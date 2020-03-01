import React from 'react';
import { Form } from 'antd';
import FormElement from '@/components/FormElement';

class ManageDetai extends React.Component {
  render () {
    const { form, modalType } = this.props;
    const FormElementProps = {
      form,
      width: 300
    }
    const plainOptions = ['未发布','发布中','审核中', '通过','撤销'];
    let label = {};
    switch(modalType) {
      case 'audit': label = { timeLabel: '发布时间', init: '发布中' }; break;
      case 'pass': label = { timeLabel: '审核时间', init: '审核中' }; break;
      case 'revoke': label = { timeLabel: '通过时间', init: '通过' }; break;
      case 'none': label = { timeLabel: '撤销时间', init: '撤销' }; break;
      default: label = { timeLabel: '文章时间', init: '未发布' };break;
    }
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
            label={label.timeLabel}
            field="articleTime"
            {...FormElementProps}
          />  
          <FormElement 
            label="文章状态"
            field="status"
            type="radio-group"
            options={plainOptions}
            initialValue={label.init}
            form={this.props.form}
          />         
        </Form>
      </div>   
    )
  }
}

export default Form.create({name: 'MangeDetail'})(ManageDetai);