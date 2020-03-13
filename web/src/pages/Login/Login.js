import React, { Component } from 'react';
import { Checkbox, Alert, Icon, Form, Button, Input, message, notification } from 'antd';
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
      message.success(data);
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
        message.success('登录成功')
      }
    },
    e => console.log('toLogin-error', e.toString())
    )
  }

  userRegister = () => {
    userRegister({

    },({ data }) => {

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

  handleRegister = () => {

  }

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
              />
              <FormElement
                {...formElementProps}
                field="password"
                label=""
                placeholder="输入用户密码"
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
            </Form>
          </Tab>
          <Tab key="register" tab="用户注册">
            <Form>
              <FormElement
                {...formElementProps}
                field="username"
                label=""
                placeholder="输入用户名"
              />
              <FormElement
                {...formElementProps}
                field="password"
                label=""
                placeholder="输入用户密码"
              />
              <FormElement
                {...formElementProps}
                field="repassword"
                label=""
                placeholder="输入确认密码"
              />
              <FormElement
                {...formElementProps}
                field="userType"
                type="select"
                label=""
                options={options}
                placeholder="请选择用户类型"
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
