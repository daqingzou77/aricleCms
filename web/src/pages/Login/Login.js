import React, { Component } from 'react';

import { Checkbox, Alert, Icon, Form, Button, Input, message, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import router from 'umi/router';
import Login from '@/components/Login';
import FormElement from '@/components/FormElement';
import {
  getCaptch,
  toLogin,
  userRegister
} from '@/services/loginRegisterService';
import styles from './Login.less';

const { Tab } = Login;

class LoginPage extends Component {
  state = {
    type: 'account',
    renderMessage: '',
    error: false,
    count: 0,
    captcha: ''
  };

  onTabChange = type => {
    this.setState({ type });
  };

  getCaptch = () => {
    getCaptch({}, ({ data }) => {
      notification.success({
        message: '验证码提醒',
        description: data,
        duration: 1,
      })
      clearInterval(this.interval);
      this.setState({
        count: 0,
        captcha: data
      })
    },
    e => console.log('getCaptch-error', e.toString())
    )
  }

  toLogin = (username, password, captcha) => {
    toLogin({
      username,
      password,
      captcha
    },({ data }) => {
      const { status } = data;
      if (status === 1) {
        this.setState({
          renderMessage: '当前用户不存在',
          error: true
        })
      } else if (status === 2) {
        this.setState({
          renderMessage: '账户密码错误',
          error: true
        })
      } else if (status === 3) {
        this.setState({
          renderMessage: '验证码输入错误',
          error: true
        })
      } else if (status === 4) {
        message.success('登录成功', 1);
        localStorage.setItem('currentUser', data.username);
        localStorage.setItem('userType', data.userType);
        router.push('/')
      }
    },
    e => console.log('toLogin-error', e.toString())
    )
  }

  userRegister = (username, password, userType) => {
    userRegister({
      username,
      password,
      userType
    },({ data }) => {
      if(!data.status) {
        message.error('注册失败，当前用户已存在！');
      } else {
        message.success('注册成功');
      }
    },
    e => console.log('userRegister-error', e.toString())
    )
  }


  getCaptcha = () => {
    let count = 59;
    this.setState({ 
      count,
      captcha: '' 
    });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      this.getCaptch()
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  handleLogin = () => {
    const { form } = this.props;
    const { captcha } = this.state;
    if (!captcha) {
      message.warning('请获取验证码');
      return;
    }
    form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;
        this.toLogin(username, password, captcha);
      }
    })
  }

  handleVisiterLogin = () => {
    localStorage.setItem('currentUser', '游客');
    localStorage.setItem('userType', -1);
    router.push('/')
  }

  handleRegister = () => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { reUsername, repassword, userType } = values;
        this.userRegister(reUsername, repassword, userType);
        form.resetFields()
      }
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('repassword')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value) {
      form.validateFields(['confirmpassword'], { force: true });
    }
    callback();
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { form } = this.props;
    const { type, count, captcha, renderMessage, error } = this.state;
    const formElementProps = {
      form,
      width: 384
    }
    const options = [{
      label: '普通用户',
      value: 0,
    }, {
      label: '作者',
      value: 1,
    }, {
      label: '管理员',
      value: 2,
    }]
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="用户登录">
            {error ? this.renderMessage(renderMessage) : null}
            <Form>
              <FormElement
                {...formElementProps}
                field="username"
                label=""
                placeholder="输入用户名"
                prefix={<UserOutlined />}
              />
              <FormElement
                {...formElementProps}
                field="password"
                label=""
                type="password"
                placeholder="输入用户密码"
                prefix={<LockOutlined />}
              />
              <FormElement>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Button
                    disabled={count}
                    onClick={this.getCaptcha}
                  >
                    {count
                      ? `${count} s`
                      : '获取验证码'
                    }
                  </Button>
                  <Input style={{ marginLeft: 10 }} value={captcha} />
                </div>
              </FormElement>
            </Form>
            <Form>
              <Button
                type="primary"
                style={{ width: 384 }}
                onClick={this.handleLogin}
              >
                用户登录
              </Button>
              <Button
                type="danger"
                style={{ width: 384, marginTop: 25 }}
                onClick={this.handleVisiterLogin}
              >
                游客登录
              </Button>
            </Form>
          </Tab>
          <Tab key="register" tab="用户注册">
            <Form>
              <FormElement
                {...formElementProps}
                field="reUsername"
                label=""
                prefix={<UserOutlined />}
                placeholder="输入用户名"
              />
              <FormElement
                {...formElementProps}
                field="repassword"
                label=""
                type="password"
                placeholder="请输入密码"
                prefix={<LockOutlined />}
                hasFeedback
                rules={[
                  {
                    validator: this.validateToNextPassword,
                  }
                ]}
              />
              <FormElement
                {...formElementProps}
                field="confirmpassword"
                label=""
                type="password"
                placeholder="输入确认密码"
                prefix={<LockOutlined />}
                hasFeedback
                rules={[
                  {
                    validator: this.compareToFirstPassword,
                  }
                ]}
              />
              <FormElement
                {...formElementProps}
                field="userType"
                type="select"
                placeholder="请选择用户类型"
                label=""
                options={options}
              />
            </Form>
            <FormElement>
              <Button
                type="primary"
                style={{ width: 384 }}
                onClick={this.handleRegister}
              >
                用户注册
              </Button>
            </FormElement>
          </Tab>
        </Login>
      </div>
    );
  }
}

export default Form.create({ name: 'LoginPage' })(LoginPage);
