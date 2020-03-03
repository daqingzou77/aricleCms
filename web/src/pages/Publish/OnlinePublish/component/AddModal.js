import React from 'react';
import { Form, message } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import FormElement from '@/components/FormElement';

class AddModal extends React.Component {

  id = 1;

  state = {
    keywordsArrays: [1]
  }

  handleAddKeys = () => {
    const { keywordsArrays } = this.state;
    keywordsArrays.push(++this.id);
    if (this.id > 10) {
      message.warning('输入关键词数以达到上限！')
      return;
    }
    this.setState({
      keywordsArrays
    })
  }

  handleMinusKeys = () => {
    const { keywordsArrays } = this.state;
    keywordsArrays.pop();
    if (--this.id < 1) return;
    this.setState({
      keywordsArrays
    })
  }

  render() {
    const { keywordsArrays } = this.state;
    const { form } = this.props;
    const FormElementProps = {
      form,
      width: 350,
    }
    const options = [{
      label: '科学',
      value: 0
    }, {
      label: '历史',
      value: 1
    }, {
      label: '文学',
      value: 2
    }, {
      label: '体育',
      value: 3
    }]
    const keywords = (
      keywordsArrays.map(item => {
        const label = `关键词${item}`;
        const field = `kewords${item}`;
        return (
          <FormElement
            {...FormElementProps}
            label={label}
            field={field}
          />
        )
      })
    )
    return (
      <div style={{ padding: 10 }}>
        <Form>
          <InfiniteScroll style={{ height: 280, overFlow: 'auto' }}>
            <FormElement
              {...FormElementProps}
              label="文章名称"
              field="articlename"
            />
            <FormElement
              {...FormElementProps}
              label="文章作者"
              field="author"
            />
            <FormElement
              {...FormElementProps}
              label="文章类型"
              field="articleType"
              type='select'
              options={options}
            />
            <FormElement
              {...FormElementProps}
              label="文章简述"
              field="articleDecription"
              type="textarea"
              rows={3}
            />
            {keywords}

            <FormElement>
              <PlusCircleOutlined
                style={{ fontSize: 20, marginRight: 10 }}
                onClick={this.handleAddKeys}
              />
              <MinusCircleOutlined
                style={{ fontSize: 20 }}
                onClick={this.handleMinusKeys}
              />
            </FormElement>
          </InfiniteScroll>
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'AddModal' })(AddModal);