import React from 'react';
import { Form } from 'antd';
import TagSelect from './TagSelect';
import StandardFormRow from '@/components/StandardFormRow'

const FormItem = Form.Item;

export default class HistorySearch extends React.Component {
  
  render() {
    const { getFieldDecorator } = this.props;
    const owners = [
      {
        id: 'wzj',
        name: '我自己',
      },
      {
        id: 'wjh',
        name: '吴家豪',
      },
      {
        id: 'zxx',
        name: '周星星',
      },
      {
        id: 'zly',
        name: '赵丽颖',
      },
      {
        id: 'ym',
        name: '姚明',
      },
    ];
    return (
      <div>
        <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
          <FormItem>
            {getFieldDecorator('category')(
              <TagSelect expandable>
                <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
              </TagSelect>,
            )}
          </FormItem>
        </StandardFormRow>
        {/* <StandardFormRow title="owner" grid>
          {getFieldDecorator('owner', {
            initialValue: ['wjh', 'zxx'],
          })(
            <Select
              mode="multiple"
              style={{ maxWidth: 286, width: '100%' }}
              placeholder="选择 owner"
            >
              {owners.map(owner => (
                <Option key={owner.id} value={owner.id}>
                  {owner.name}
                </Option>
              ))}
            </Select>,
          )}
          <a className={styles.selfTrigger} onClick={this.setOwner}>
            只看自己的
              </a>
        </StandardFormRow> */}
      </div>
    )
  }
}