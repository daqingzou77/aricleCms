import React from 'react';
import { Form, Button } from 'antd';
import TagSelect from './TagSelect';
import StandardFormRow from '@/components/StandardFormRow'
import FormElement from '@/components/FormElement';
import FormRow from '@/components/FormRow';
import CustomEmpty from '@/components/CustomizeEmpty';
import fakeTagList from './mock';


class HistorySearch extends React.Component {

  state = {
    selectOptions: fakeTagList
  };

  saveSelect = (selectArrays) => {
    this.setState({
      selectOptions: selectArrays
    })
  };

  handleQuery = () => {
    this.props.handleOnQuery();
  }

  render() {
    const { form } = this.props;
    const { selectOptions } = this.state;
    const formElementProps = {
      form,
      width: 300,
    };
    const options = [];
    selectOptions.map(opt => {
      options.push({ label: opt, value: opt })
    })
    return (
      <>
        <Form layout="inline">
          <StandardFormRow title={<span style={{ fontWeight: 'bold' }}>关键词列表</span>} block style={{ paddingBottom: 11 }}>
            <TagSelect saveSelect={this.saveSelect} />
          </StandardFormRow>
          <FormRow>
            <CustomEmpty>
              <FormElement
                {...formElementProps}
                mode="tags"
                type="select"
                field="keywords"
                placeholder="请选择查询关键词"
                options={options}
              />
            </CustomEmpty>
            <FormElement>
              <Button type="primary" icon="search" onClick={this.handleQuery}>查询</Button>
            </FormElement>
          </FormRow>
        </Form>
      </>
    )
  }
}

export default Form.create({ name: 'historySearch' })(HistorySearch);