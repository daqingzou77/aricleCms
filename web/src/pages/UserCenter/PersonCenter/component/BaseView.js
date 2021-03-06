import React, { Fragment } from 'react';
import { Button, Form, message } from 'antd';
import moment from 'moment';
import FormElement from '@/components/FormElement';
import UploadImg from './UploadImg';
import {
  updateUserDetail
} from '@/services/userService'
import styles from './style.less';

class BaseView extends React.Component {

  state = {
    imagUrl: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  }

  saveImg = imagUrl => {
    this.setState({
      imagUrl,
    })
  }

  handlerSubmit = () => {
    const { form, getCurrentUserDetail } = this.props;
    const { imagUrl } = this.state;
    form.validateFields((err, values) => {
      if (!err) {
        const updateParam = Object.assign({}, values);
        updateParam.avatar = imagUrl;
        updateUserDetail(updateParam, ({ data }) => {
          if (data.status) {
            message.success('更新成功');
            getCurrentUserDetail();
          } else {
            message.error('更新失败');
          }
        },
        e => console.log('updateUserDetail-error', e.toString())
        )
      }
    })
  }

  refresh = () => {
    const { form } = this.props;
    form.resetFields();
  }

  render() {
    const { form, currentUser, } = this.props;
    const { imagUrl } = this.state;
    const { avatar } = currentUser;
    // 匹配初始条件
    const defaultUrl = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    const formElementProps = {
      form,
      width: 400
    };
    const options = [{
      label: '用户',
      value: 0
    }, {
      label: '作者',
      value: 1
    }, {
      label: '管理员',
      value: 2
    }];
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form autoComplete="off">
            <FormElement
              {...formElementProps}
              label="用户名称"
              field="username"
              disabled
              initialValue={currentUser.username}
            />
            <FormElement
              {...formElementProps}
              label="用户昵称"
              field="nickname"
              initialValue={currentUser.nickname}
            />
            <FormElement
              {...formElementProps}
              label="创建时间"
              field="createTime"
              disabled
              initialValue={moment(currentUser.createTime).format('YYYY-MM-DD hh:mm:ss')}
            />
            <FormElement
              {...formElementProps}
              label="用户类型"
              disabled
              type="select"
              field="userType"
              initialValue={currentUser.userType}
              options={options}
            />
            <FormElement
              {...formElementProps}
              label="用户密码"
              field="password"
              initialValue={currentUser.password}
            />
            <FormElement
              {...formElementProps}
              label="电话号码"
              field="telephoneNumber"
              initialValue={currentUser.telephoneNumber}
            />
            <FormElement
              {...formElementProps}
              label="个人邮箱"
              field="email"
              initialValue={currentUser.email}
            />
            <FormElement
              {...formElementProps}
              label="个人地址"
              field="address"
              initialValue={currentUser.address}
            />
            <FormElement
              {...formElementProps}
              label="信息描述"
              rows={4}
              type="textarea"
              field="decription"
              initialValue={currentUser.decription}
            />
            <FormElement>
              <Button type="primary" onClick={this.handlerSubmit} style={{ marginRight: 20, width: 100 }}>
                更新信息
              </Button>
              <Button type="danger" style={{ width: 100 }} onClick={this.refresh}>
                重置信息
              </Button>
            </FormElement>
          </Form>
        </div>
        <div className={styles.right}>
          <Fragment>
            <div className={styles.avatar_title}>
              头像
            </div>
            <div className={styles.avatar}>
              <img src={imagUrl.search(defaultUrl) === -1 ? imagUrl : avatar ? avatar : defaultUrl} alt="用户头像" height={140} style={{ borderRadius: '50%' }} />
            </div>
            <UploadImg saveImg={this.saveImg} />
          </Fragment>
        </div>
      </div>
    )
  }
}

export default Form.create({ name: 'BaseView' })(BaseView); 