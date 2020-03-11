import React, { Fragment } from 'react';
import { Upload, Button, Form } from 'antd';
import FormElement from '@/components/FormElement';
import UploadImg from './UploadImg';
import styles from './style.less';
import { currentUser } from '../mock';

class BaseView extends React.Component {

  state = {
    imagUrl: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  }

  saveImg = imagUrl => {
    this.setState({
      imagUrl,
    })
  }

  render() {
    const { form } = this.props;
    const { imagUrl } = this.state;
    const formElementProps = {
      form,
      width: 400
    };
    // 头像组件 方便以后独立，增加裁剪之类的功能
    const AvatarView = () => (
      <Fragment>
        <div className={styles.avatar_title}>
          头像
        </div>
        <div className={styles.avatar}>
          <img src={imagUrl} alt="avatar" />
        </div>
        <UploadImg saveImg={this.saveImg} />
        {/* <Upload>
      <div className={styles.button_view}>
        <Button icon="upload" type="ghost">
          更换头像
        </Button>
      </div>
    </Upload> */}
      </Fragment>
    );
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
              initialValue={currentUser.ninckname}
            />
            <FormElement
              {...formElementProps}
              label="用户账号"
              field="account"
              disabled
              initialValue={currentUser.account}
            />
            <FormElement
              {...formElementProps}
              label="用户类型"
              disabled
              field="name"
              initialValue={currentUser.userType === 0 ? '管理员' : '用户'}
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
              field="telphoneNumber"
              initialValue={currentUser.telphoneNumber}
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
              <Button type="danger" style={{ width: 100 }}>
                重置信息
              </Button>
            </FormElement>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' />
        </div>
      </div>
    )
  }
}

export default Form.create({ name: 'BaseView' })(BaseView); 