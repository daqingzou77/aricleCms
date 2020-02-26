import React from 'react';
import { Upload, Form, Card, Row, Col, Icon, message, Table, Badge } from 'antd';
import moment from 'moment';
import FormELement from '@/components/FormElement';

const { Dragger } = Upload;
class AnnexUpload extends React.Component {

  columns = [{
    title: '文章名',
    dataIndex: 'articlename',
  }, {
    title: '作者',
    dataIndex: 'author',
  }, {
    title: '文章类型',
    dataIndex: 'articleType',
  }, {
    title: '文章描述',
    dataIndex: 'ariticleDescription',
  }, {
    title: '文章状态',
    dataIndex: 'status',
    render: () => (
      <span>
        <Badge status="success" />
        Finished
      </span>
    ),
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
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

    const dataSource = [];
    for (let i = 0; i < 23; i++) {
      dataSource.push({
        articlename: `水浒绪论${i + 1}`,
        author: '施耐庵',
        articleType: '小说',
        ariticleDescription: '本章节..',
        createTime: moment(new Date).format('YYYY-MM-DD hh:mm:ss')
      })
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
        <Card
          title={<span style={{ fontWeight: 'bold'}}>上传列表</span>}
          style={{ marginTop: 10 }}
          extra={<div style={{ color: '#2884D8', cursor: 'pointer' }}><Icon type='reload' />&nbsp;刷新</div>}
        >
          <Table
            columns={this.columns}
            dataSource={dataSource}
            rowKey="id"
            expandedRowRender={record => (
              <div style={{ margin: 0, textAlign: 'left' }}>
                <p>
                  <span>
                    章节： section1
                  </span>
                  &nbsp; &nbsp;
                  <span>
                    状态：  <Badge status="success" /> Finished
                  </span>
                  &nbsp; &nbsp;
                  <span>
                    章节时间： {moment(new Date()).format('YYYY/MM/DD hh:mm:ss')}
                  </span>
                  &nbsp; &nbsp;
                  <span>
                    章节内容： daqing
                  </span>
                </p>
              </div>
            )}
          />
        </Card>
      </>
    )
  }
}

export default Form.create({ name: 'AnnexUpload' })(AnnexUpload);