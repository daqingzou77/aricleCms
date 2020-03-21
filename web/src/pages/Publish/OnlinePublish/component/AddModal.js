import React from 'react';
import { Form } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import FormElement from '@/components/FormElement';

class AddModal extends React.Component {

  render() {
    const { form } = this.props;
    const FormElementProps = {
      form,
      width: 350,
      autoComplete: "off"
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
    return (
      <div style={{ padding: 10 }}>
        <Form>
          <InfiniteScroll 
            style={{ height: 200, overFlow: 'auto' }}
            hasMore={false}
            loadMore={()=>{}}
          >
            <FormElement
              {...FormElementProps}
              label="文章名称"
              field="articlename"
              required
            />
            <FormElement
              {...FormElementProps}
              label="文章作者"
              field="author"
              required
            />
            <FormElement
              {...FormElementProps}
              label="文章类型"
              field="articleType"
              type='select'
              options={options}
              required
            />
          </InfiniteScroll>
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'AddModal' })(AddModal);