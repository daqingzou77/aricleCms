import React from 'react';
import { Form } from 'antd';
import moment from 'moment';
import FormElement from '@/components/FormElement';

class ManageDetai extends React.Component {

  render() {
    const { form, modalType, modalValue } = this.props;
    const { articlename, author, publishTime, auditTime, passTime, revokeTime } = modalValue;
    const FormElementProps = {
      form,
      width: 350
    }
    const plainOptions = ['未发布', '发布中', '审核中', '通过', '撤销'];
    let label = {};
    switch (modalType) {
      case 'audit': label = { timeLabel: '发布时间', init: '发布中', time: publishTime || null, index: 1 }; break;
      case 'pass': label = { timeLabel: '审核时间', init: '审核中', time: auditTime || null, index: 2 }; break;
      case 'revoke': label = { timeLabel: '通过时间', init: '通过', time: passTime || null, index: 3 }; break;
      case 'none': label = { timeLabel: '撤销时间', init: '撤销', time: revokeTime || null, index: 4 }; break;
      default: label = { timeLabel: '创建时间', init: '未发布', index: 0 }; break;
    }
    const newPlains = plainOptions.slice(label.index);
    return (
      <div style={{ padding: 10 }}>
        <Form>
          <FormElement
            {...FormElementProps}
            label="文章名称"
            field="articlename"
            initialValue={articlename}
            disabled
          />
          <FormElement
            {...FormElementProps}
            label="文章作者"
            field="author"
            initialValue={author}
            disabled
          />
          <FormElement
            {...FormElementProps}
            label={label.timeLabel}
            field="articleTime"
            disabled
            initialValue={moment(label.time).format('YYYY-MM-DD hh:mm:ss')}
          />
          <FormElement
            label="文章状态"
            field="status"
            type="radio-group"
            width={350}
            options={newPlains}
            initialValue={label.init}
            form={this.props.form}
          />
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'MangeDetail' })(ManageDetai);