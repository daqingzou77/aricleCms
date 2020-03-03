import React from 'react';
import { Form } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import FormElement from '@/components/FormElement';


class UploadModal extends React.Component {
  render() {
    const { form } = this.props;
    const FormElementProps = {
      form,
      width: 350,
    }
    const keywordsArrays = [1, 2, 3, 4, 5 ];
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
        <InfiniteScroll style={{ height: 300, overFlow: 'auto' }}>
          <Form>
            <FormElement
              {...FormElementProps}
              label="文章名称"
              field="articlename"
              disabled
            // initialValue={articlename}
            />
            <FormElement
              {...FormElementProps}
              label="文章作者"
              field="author"
              disabled
            // initialValue={author}
            />
            <FormElement
              {...FormElementProps}
              label="文章类型"
              field="articleType"
              disabled
              type='select'
            // initialValue={author}
            />
            <FormElement
              {...FormElementProps}
              label="文章简述"
              field="articleDescription"
              type="textarea"
              rows={3}
            // initialValue={author}
            />
            {keywords}
            <FormElement
              {...FormElementProps}
              label="文章内容"
              field="articleContent"
              type="textarea"
              rows={8}
            />
          </Form>
        </InfiniteScroll>

      </div>
    )    
  }   
} 
      
  export default Form.create({ name: 'UploadModal' })(UploadModal);    