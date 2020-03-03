import React from 'react';
import { Form, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import FormElement from '@/components/FormElement';


class UploadModal extends React.Component {
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
    const { form } = this.props;
    const { keywordsArrays } = this.state;
    const FormElementProps = {
      form,
      width: 350,
    }
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
            <FormElement
              {...FormElementProps}
              label="文章内容"
              field="articleContent"
              type="textarea"
              rows={8}
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

          </Form>
        </InfiniteScroll>

      </div>
    )
  }
}

export default Form.create({ name: 'UploadModal' })(UploadModal);    