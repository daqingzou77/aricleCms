import React from 'react';
import { Upload, Form, Card, Row, Col, Icon, message } from 'antd';
import FormELement from '@/components/FormElement';

const { Dragger } = Upload;
class AnnexUpload extends React.Component {

  columns = [{
    title: '文章名',
    dataIndex: 'articlename'
  }, {
    title: '标题内容',
    dataIndex: 'articleContents'
  }]

  render() {
    const { form } = this.props;
    const options = [{
      label: 'options1',
      value: 'options1'
    }, {
      label: 'options2',
      value: 'options2'
    }];

    const formElementProps = {
      form,
      width: 620,
    }

    const props = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    return (
      <>
        <Card
          title={<span style={{ fontWeight: 'bold' }}>附件上传</span>}
          extra={<span style={{ fontWeight: 'bold', cursor: 'pointer' }}><Icon type="delete" /> 重置</span>}
        >
          <Row type="flex" justify="space-around" align="middle">
            <Col>
              <Form>
                <FormELement
                  {...formElementProps}
                  label="上传文件标题"
                  field="annexName"
                />
                <FormELement
                  {...formElementProps}
                  label="上传文件类型"
                  field="annexType"
                  type="select"
                  options={options}
                />
                <FormELement>
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                      band files
                    </p>
                  </Dragger>
                </FormELement>
              </Form>
            </Col>
          </Row>
        </Card>
      </>
    )
  }
}

export default Form.create({ name: 'AnnexUpload' })(AnnexUpload);