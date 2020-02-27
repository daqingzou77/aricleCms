import React, { Fragment } from 'react';
import { Upload, Button, Form  } from 'antd';
import FormElement from '@/components/FormElement';
import styles from './style.less';
import { currentUser } from '../mock';

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>
      头像
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload>
      <div className={styles.button_view}>
        <Button icon="upload" type="ghost">
          更换头像
        </Button>
      </div>
    </Upload>
  </Fragment>
);

class BaseView extends React.Component {
  
  // getAvatarURL() {
  //   const { currentUser } = this.props;
  //   if (currentUser) {
  //     if (currentUser.avatar) {
  //       return currentUser.avatar;
  //     }
  //     const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
  //     return url;
  //   }
  //   return '';
  // }

  render() {
    const { form } = this.props;
    const formElementProps = {
      form,
      width: 400
    };
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form autoComplete="off">
            <FormElement 
              {...formElementProps}
              label="用户名称"
              field="username"
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

export default Form.create({ name: 'BaseView'})(BaseView); 