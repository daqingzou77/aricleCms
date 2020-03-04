import React from 'react';
import { Upload, Form, Card, Row, Col, Icon, message, Table, Badge, Button } from 'antd';
import moment from 'moment';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import FormElement from '@/components/FormElement';
import {
  annexUpload,
  downloadAnnex,
  articleAnnexUpload,
  getAnnexRecord
} from '@/services/annexService'
import styles from './style.less';

const { Dragger } = Upload;
class AnnexUpload extends React.Component {

  id = 1;

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
        已发布
      </span>
    ),
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
  }]

  state = {
    required: true,
    keysArrays: [1],
  }
 
  componentDidMount() {
    this.getAnnexRecord();
  }

  getAnnexRecord = () => {
    getAnnexRecord({},({ data }) => {
      this.state({
        dataSource: data
      })
    },
    e => console.log('getAnnexRecord-error', e.toString())
    )
  }

  handleAddKeys = () => {
    const { keysArrays } = this.state;
    if (this.id > 10) {
      message.warning('关键词输入以达到上限');
    }
    keysArrays.push(++this.id);
    this.setState({
      keysArrays
    })
  }

  handleMinusKeys = () => {
    const { keysArrays } = this.state;
    if (this.id === 1) return;
    keysArrays.pop();
    this.setState({
      keysArrays
    })
  }

  handleOnBefore = file => {
    const { name } = file;
    console.log('name', name);
    const newName = name.substring(name.lastIndexOf('.'), name.length);
    if(newName !== '.doc' || newName !== '.docx') {
      message.warning('请选择文档');
      return;
    }
  }

  handleOnComfirm = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { articlename, author, articleType, articleDescription, ...keyword } = values;
        const keywords = [];
        for (let obj in keyword) {
          keywords.push(keyword[obj]);
        }
        articleAnnexUpload({
          articlename,
          author,
          articleType,
          articleForm: 0,
          articleDescription,
          keywords
        }, ({ data }) => {
          if (data.length === 0) {
            message.error('该文章已存在！');
          } else {
            message.success('文章发布成功！');
            this.getAnnexRecord();
          }
          form.resetFileds();
        },
          e => console.log('publishArticle-error', e.toString())
        )
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { form } = this.props;
    const { required, keysArrays,dataSource } = this.state;
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
    }];

    const FormElementProps = {
      form,
      width: 620,
    }

    const props = {
      name: 'file',
      multiple: true,
      action: 'http://localhost:9999/api/annex/annexUpload',

      // onChange(info) {
      //   const { status } = info.file;
      //   if (status !== 'uploading') {
      //     console.log(info.file, info.fileList);
      //   }
      //   if (status === 'done') {
      //     message.success(`${info.file.name} file uploaded successfully.`);
      //   } else if (status === 'error') {
      //     message.error(`${info.file.name} file upload failed.`);
      //   }
      // },
    };

    const keywords = (
      <InfiniteScroll className={keysArrays.length > 3 ? styles.annexScroll : null}>
        {
          keysArrays.map(item => {
            const label = `关键词${item}`;
            const field = `kewords${item}`;
            return (
              <div className={styles.keyword}>
                <FormElement
                  style={{ paddingLeft: 5 }}
                  {...FormElementProps}
                  label={label}
                  field={field}
                  required={required}
                  autocomplete="off"
                />
                <PlusCircleOutlined
                  className={styles.plusIcon}
                  onClick={this.handleAddKeys}
                />
                {
                  keysArrays.length > 1 ? (
                    <MinusCircleOutlined
                      className={styles.minusIcon}
                      onClick={this.handleMinusKeys}
                    />
                  ) : null
                }
              </div>
            )
          })
        }
      </InfiniteScroll>
    )
    return (
      <>
        <Card
          title={<span style={{ fontWeight: 'bold' }}>文章上传</span>}
          extra={<span style={{ cursor: 'pointer', color: '#2884D8' }}><Icon type="reload" /> 刷新</span>}
        >
          <Row type="flex" justify="space-around" align="middle">
            <Col>
              <Form>
                <FormElement
                  {...FormElementProps}
                  label="文章标题"
                  field="articlename"
                  required={required}
                  autoComplete="off"
                />
                <FormElement
                  {...FormElementProps}
                  label="文章作者"
                  field="author"
                  required={required}
                  autoComplete="off"
                />
                <FormElement
                  {...FormElementProps}
                  label="文章类型"
                  field="articleType"
                  type="select"
                  options={options}
                  required={required}
                  autoComplete="off"
                />
                {keywords}
                <FormElement
                  {...FormElementProps}
                  label="文章简述"
                  field="articleDescription"
                  type="textarea"
                  rows={3}
                  required={required}
                  autoComplete="off"
                />
                <FormElement>
                  <Dragger 
                    {...props}
                    beforeUpload={this.handleOnBefore}
                  >
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">单击或将文件拖到该区域上传</p>
                  </Dragger>
                </FormElement>
                <FormElement style={{ textAlign: 'center' }}>
                  <Button
                    type="primary"
                    icon="upload" 
                    style={{ width: "40%", marginRight: 10 }}
                    onClick={this.handleOnComfirm}
                  >
                    确认发布
                  </Button>
                  <Button 
                    type="danger"
                    icon="delete" 
                    style={{ width: '40%' }}
                    onClick={this.handleReset}
                  >
                    内容重置
                  </Button>
                </FormElement>
              </Form>
            </Col>
          </Row>
        </Card>
        <Card
          title={<span style={{ fontWeight: 'bold' }}>上传列表</span>}
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
                    状态：  <Badge status="success" /> 已发布
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