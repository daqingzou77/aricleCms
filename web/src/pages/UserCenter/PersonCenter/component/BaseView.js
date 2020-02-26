import React, { Fragment } from 'react';
import { Upload, Button, Input } from 'antd';
import styles from './style.less';

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <Fragment>
    <div className={styles.avatar_title}>
      {/* <FormattedMessage id="accountandsettings.basic.avatar" defaultMessage="Avatar" /> */}
    </div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          {/* <UploadOutlined />
          <FormattedMessage
            id="accountandsettings.basic.change-avatar"
            defaultMessage="Change avatar"
          /> */}
        </Button>
      </div>
    </Upload>
  </Fragment>
);

class BaseView extends React.Component {
  render() {
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form layout='vertical' hideRequiredMark autoComplete="off">
            <FormItem label={formatMessage({ id: 'accountandsettings.basic.nickname' })}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'accountandsettings.basic.nickname-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={formatMessage({ id: 'accountandsettings.basic.email' })}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'accountandsettings.basic.email-message' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>

            <FormItem label="已上传农事记录数据条数">
              {getFieldDecorator('uploadedItems', {
                rules: [
                  {
                    required: true,
                    message: '',
                  },
                ],
              })(
                <Input disabled />,
              )}
            </FormItem>
            <FormItem label={formatMessage({ id: 'accountandsettings.basic.phone' })}>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'accountandsettings.basic.phone-message' }, {}),
                  },
                  // { validator: validatorPhone },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="地址">
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'accountandsettings.basic.profile-message' }, {}),
                  },
                ],
              })(
                <Input.TextArea
                  placeholder="请输入住址"
                  rows={4}
                />,
              )}
            </FormItem>
            <Button type="primary" onClick={this.handlerSubmit} style={{ marginRight: 20, width: 100 }}>
              更新信息
            </Button>
            <Button type="danger" style={{ width: 100 }}>
              重置信息
            </Button>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    )
  }
}