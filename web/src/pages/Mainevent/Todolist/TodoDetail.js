/* eslint-disable no-param-reassign */
import { formatMessage as _formatMessage, getLocale } from 'umi/locale';
import React from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select, Modal, Table, Icon, message } from 'antd';
import moment from 'moment';
import {
  getTodoListDetail,
  dealWithBacklog,
  queryDutyUser
} from '../../../services/scheduleService';
import FormItem from '@/components/FormItem';

const formatMessage = (id) => { return _formatMessage({ id }) }

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, achieveState } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
            },
          ],
          initialValue: record[dataIndex],
        })(
          achieveState ?
            (
              <Input
                ref={node => (this.input = node)}
                disabled
                placeholder={formatMessage('guet.schedule.finished')}
              />) : (
              <Select
                ref={node => this.input = node}
                onPressEnter={this.save}
                onBlur={this.save}
              >
                <Select.Option value={formatMessage('guet.schedule.unfinished')}>{formatMessage('guet.schedule.unfinished')}</Select.Option>
                <Select.Option value={formatMessage('guet.schedule.finished')}>{formatMessage('guet.schedule.finished')}</Select.Option>
              </Select>
            )
        )}
      </Form.Item>
    ) :
      (
        <div
          style={{ paddingRight: 24 }}
          onClick={achieveState ? '' : this.toggleEdit}
        >
          {children}
        </div>
      )
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
            children
          )}
      </td>
    );
  }
}

class TodoDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    // eslint-disable-next-line no-unused-expressions
    this.pointColunms = [{
      title: 'Id',
      dataIndex: 'emphasisNumber',
      align: 'center',
    }, {
      title: formatMessage('guet.schedule.focus'),
      dataIndex: 'emphasisContent',
      align: 'center',
    }, {
      title: formatMessage('guet.schedule.finish_status'),
      dataIndex: 'achieveStates',
      align: 'center',
      editable: true
    }, {
      title: formatMessage('guet.schedule.accomplishTime'),
      dataIndex: 'achieveTime',
      align: 'center',
      format: "DD/MM/YYYY HH:mm:ss"
    }, {
      title: formatMessage('guet.schedule.finisher'),
      align: 'center',
      dataIndex: 'achieveUser',
    }]
      this.state = {
        id: props.id,
        pointDataSource: [],
        backlog: {
          id: 0,
          userId: '',
          matterName: '',
          createReason: '',
          urgentLevel: 1,
          requireTime: new Date(),
          emphasis: '',
          backlogState: '',
          releaseTime: null,
          achieveState: false,
        },
        userName: '',
      };
  }


  componentDidMount() {
    this.getTodoListDetailById();
  }

  getTodoList = () => {
    this.props.getTodoList();
  }

  getTodoListDetailById = () => {
    const { id } = this.state;
    getTodoListDetail({
      id
    }, ({ data }) => {
      console.log('getTodoListDetail--data：', data);
      data.emphasisList.map(item => {
        item.key = item.emphasisNumber;
        if (item.achieveTime) {
          item.achieveTime = moment(item.achieveTime).format('DD/MM/YYYY HH:mm:ss');
        }
        if (item.achieveState) {
          item.achieveUser = item.achieveUser;
          item.achieveStates = formatMessage('guet.schedule.finished');
        } else {
          item.achieveStates = formatMessage('guet.schedule.unfinished')
        }
      });
      console.log('emphasisList', data.emphasisList);
      this.setState({
        backlog: data.backlog,
        userName: data.userName,
        pointDataSource: data.emphasisList,
      });
    }, (e) => {
      console.log('getTodoListDetail--error：', e.toString());

    })
  }

  // handleOnchange = (e, defaultVal) => {
  //   console.log('changeValue', e.target.value);
  //   console.log('defaultVal', defaultVal);
  //   if (e.target.value !== defaultVal) {
  //     this.input.value = defaultVal;
  //   }
  // };

  handleOnBlur = (e, defaultVal, filedName) => {
    const { form: { setFieldsValue } } = this.props;
    if (e.target.value !== defaultVal) {
      setFieldsValue({ [filedName]: defaultVal });
    }
  }

  handleSave = row => {
    const newData = [...this.state.pointDataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    if (row.achieveStates === formatMessage('guet.schedule.finished')) {
      row.achieveUser = localStorage.getItem('userName');
      row.achieveTime =  moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    } else {
      row.achieveUser = '';
      row.achieveTime =  '';
    }
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({
      pointDataSource: newData
    });
  };

  handleClose = () => {
    this.props.handleClose();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props;
    const { id, pointDataSource } = this.state;
    const userId = localStorage.getItem('userId');
    queryDutyUser({}, ({ data }) => {
      if(data) {
        form.validateFields((err, values) => {
          if (!err) {
            const emphasisListParam = [];
            pointDataSource.forEach(item => {
              const params = {
                achieveState: (item.achieveStates === formatMessage('guet.schedule.unfinished') ? false : true),
                achieveTime: moment(item.achieveTime, 'DD/MM/YYYY HH:mm:ss').toDate(),
                achieveUser: item.achieveUser,
                backlogId: item.backlogId,
                emphasisContent: item.emphasisContent,
                emphasisNumber: item.emphasisNumber,
                id: item.id
              };
              emphasisListParam.push(params);
            })
            const { name, reason, seat, date, state } = values;
            const newBacklog = {
              // eslint-disable-next-line no-unneeded-ternary
              achieveState: (state === '未完成' ? false : true),
              backlogState: true,
              createReason: reason,
              id,
              matterName: name,
              releaseTime: new Date(),
              requireTime: date.toDate(),
              urgentLevel: (seat === "紧急" ? 1 : 2),
              userId
            };
            console.log('emphasisListParam', emphasisListParam);
            dealWithBacklog(
              {
                backlog: newBacklog,
                emphasisList: emphasisListParam
              },
              ({ data }) => {
                if (data) {
                  Modal.success({
                    title: formatMessage('guet.schedule.toDolist_solve'),
                    content: formatMessage('guet.schedule.submit_success'),
                    okText: formatMessage('guet.schedule.confirm')
                  });
                  this.getTodoList();
                } else {
                  Modal.error({
                    title: formatMessage('guet.schedule.toDolist_solve'),
                    content: formatMessage('guet.schedule.submit_fail'),
                    okText: formatMessage('guet.schedule.confirm')
                  });
                }
              },
              error => {
                console.log('todoDetail--error：', error.toString());
              }
            )
          }
        })
      }else {
        message.warning(formatMessage('guet.schedule.current_isNot_arrangement_not_solveTodos'))
      }
    })
  };


  render() {
    const {
      backlog,
      userName,
      pointDataSource,
    } = this.state

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.pointColunms.map(col => {
      if (!col.editable) {
        return col;
      };
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          achieveState: record.achieveState,
          handleSave: this.handleSave,
        }),
      };
    });

    const {
      form: { getFieldDecorator },
    } = this.props;

    let labelWidth = 139;
    if (getLocale() === 'fr-FR') {
      labelWidth = 193;
    }

    return (
      <>
        <h2 style={{ textAlign: 'center' }}>{backlog.achieveState ? formatMessage('guet.schedule.toDolist_finish') : formatMessage('guet.schedule.toDolist_detail')}</h2>
        <Icon
          type="close"
          style={{ float: 'right', marginRight: '10px', marginTop: '-50px' }}
          onClick={this.handleClose}
        />
        <Form labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} onSubmit={this.handleSubmit} autoComplete="off">
          <Row gutter={24}>
            <Col>
              <FormItem
                labelWidth={labelWidth}
                labelText={formatMessage('guet.schedule.to_do_name')}
                required={false}
              >
                {getFieldDecorator('name', {
                  initialValue: backlog.matterName
                })(
                  <Input
                    onBlur={e => this.handleOnBlur(e, backlog.matterName, 'name')}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <FormItem
                labelText={formatMessage('guet.schedule.to_do_list_generation_reason')}
                labelWidth={labelWidth}
                required={false}
              >
                {getFieldDecorator('reason', {
                  initialValue: backlog.createReason
                })(
                  <Input
                    onBlur={e => this.handleOnBlur(e, backlog.createReason, 'reason')}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                labelText={formatMessage('guet.schedule.emergency_level')}
                labelWidth={labelWidth}
                required={false}
              >
                {getFieldDecorator('seat', {
                  initialValue: backlog.urgentLevel === 1 ? formatMessage('guet.schedule.urgent') : formatMessage('guet.schedule.normal'),
                })(
                  <Input
                    onBlur={e => this.handleOnBlur(e, backlog.urgentLevel === 1 ? formatMessage('guet.schedule.urgent') : formatMessage('guet.schedule.normal'), 'seat')}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <FormItem
                labelWidth={labelWidth}
                labelText={formatMessage('guet.schedule.to_do_list_generator')}
                required={false}
              >
                {getFieldDecorator('todo', {
                  initialValue: userName,
                })(
                  <Input
                    onBlur={e => this.handleOnBlur(e, userName, 'todo')}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                labelText={formatMessage('guet.schedule.request_completion_time')}
                labelWidth={labelWidth}
                required={false}
              >
                {getFieldDecorator('date', {
                  initialValue: moment(new Date(backlog.requireTime), 'DD/MM/YYYY HH:mm:ss'),
                })(
                  <DatePicker
                    showTime 
                    format="DD/MM/YYYY HH:mm:ss"
                    allowClear={false}
                    onBlur={e => this.handleOnBlur(e, moment(new Date(backlog.requireTime)), 'date')}
                  />)}
              </FormItem>
            </Col>

            <Col span={8}>

              <FormItem
                labelWidth={labelWidth}
                labelText={formatMessage('guet.schedule.finish_status')}
                required={false}
              >
                {getFieldDecorator('state', {
                  initialValue: backlog.achieveState ? formatMessage('guet.schedule.finished') : formatMessage('guet.schedule.unfinished'),
                })(
                  <Input
                    onBlur={e => this.handleOnBlur(e, backlog.achieveState ? formatMessage('guet.schedule.finished') : formatMessage('guet.schedule.unfinished'), 'state')}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem
            labelText={formatMessage('guet.schedule.toDolist_solve')}
            labelWidth={labelWidth}
            required={false}
          >
            <Table
              components={components}
              bordered
              dataSource={pointDataSource}
              columns={columns}
              pagination={false}
            />
          </FormItem>
          <Row type="flex" justify="end">
            {!backlog.achieveState ?
              <>
                <Button type="primary" htmlType="submit">
                  {formatMessage('guet.schedule.submit')}
                </Button>
              </> : ''
            }
          </Row>
        </Form>
      </>
    );
  }
}

export default Form.create()(TodoDetail);
