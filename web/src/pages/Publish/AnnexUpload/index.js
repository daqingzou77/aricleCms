import React from 'react';
import { Upload, Form, Card, Row, Col, Icon, message, Table, Badge, Button, Tag } from 'antd';
import moment from 'moment';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import CustomizeEmpty from '@/components/CustomizeEmpty';
import FormElement from '@/components/FormElement';
import {
  downloadAnnex,
  removeAnnex,
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
    render: (_, record) => {
      let text;
      switch (record.articleType) {
        case 0: text = "科学"; break;
        case 1: text = "历史"; break;
        case 2: text = "文学"; break;
        case 3: text = "体育"; break;
        default: text = "";
      }
      return text
    }
  }, {
    title: '文章描述',
    dataIndex: 'articleDescription',
  }, {
    title: '附件名',
    dataIndex: 'annexname',
    render: (_, record) => (
      <a onClick={() => this.downloadAnnex(record.annexname)}>{record.annexname}</a>
    )
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
    dataIndex: 'publishTime',
    render: (_, record) => <span>{moment(record.publishTime).format('YYYY-MM-DD hh:mm:ss')}</span>
  }]

  state = {
    required: true,
    keysArrays: [1],
    fileList: [],
    dataSource: [],
    loading: true,
  }

  componentDidMount() {
    this.getAnnexRecord();
  }

  getAnnexRecord = () => {
    getAnnexRecord({}, ({ data }) => {
      console.log('getAnnexData', data);
      this.setState({
        dataSource: data,
        loading: false
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
    const { fileList } = this.state;
    const { name } = file;
    const extendName = name.substring(name.lastIndexOf('.'), name.length);
    if (extendName === '.doc' || extendName === '.docx') {
      fileList.push(file);
      this.setState({
        fileList
      })
    } else {
      message.warning('请选择以.doc或者.docx文件结尾的文档上传！');
      return false;
    }
    if (fileList.length > 1) {
      message.warning('如需重新上传，需替换当前文件！');
      fileList.pop();
      this.setState({
        fileList
      })
      return false;
    }
    return true;
  }

  handleOnRemove = file => {
    const { name } = file;
    removeAnnex({
      annexname: name
    }, ({ data }) => {
      if (data.deleteCount > 0) {
        message.success('文件删除成功');
      }
      this.setState({
        fileList: []
      })
    }, e => console.log('removeAnnex-error', e.toString()))
  }

  handleOnComfirm = () => {
    const { form } = this.props;
    const { fileList } = this.state;
    if (fileList.length === 0) {
      message.warning('请上传相关文章附件！');
      return;
    }
    const annexname = fileList.pop().name;
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
          annexname,
          keywords
        }, ({ data }) => {
          if (data.length === 0) {
            message.error('该文章已存在！');
          } else {
            message.success('文章发布成功！');
            this.getAnnexRecord();
          }
          form.resetFields();
        },
          e => console.log('publishArticle-error', e.toString())
        )
      }
    })
  }

  downloadAnnex = annexname => {
    downloadAnnex(annexname);
  }

  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
  }

  refresh = () => {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      this.getAnnexRecord();
    }, 1000)
  }

  render() {
    const { form } = this.props;
    const { required, keysArrays, dataSource, fileList, loading } = this.state;
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
      onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
          message.success('文件上传成功！');
        } else if (status === 'error') {
          message.error('文件上传失败！');
        }
      },
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
                    fileList={fileList}
                    onRemove={file => this.handleOnRemove(file)}
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
          extra={<div style={{ color: '#2884D8', cursor: 'pointer' }} onClick={this.refresh}><Icon type='reload' />&nbsp;刷新</div>}
        >
          <CustomizeEmpty>
            <Table
              columns={this.columns}
              dataSource={dataSource}
              loading={loading}
              rowKey="id"
              expandedRowRender={record => (
                <div style={{ margin: 0, textAlign: 'left' }}>
                  {record.keywords.map((item, index) => {
                    return (
                      <span>关键词{index + 1}：<Tag>{item}</Tag></span>
                    )
                  })}
                </div>
              )}
            />
          </CustomizeEmpty>
        </Card>
      </>
    )
  }
}

export default Form.create({ name: 'AnnexUpload' })(AnnexUpload);