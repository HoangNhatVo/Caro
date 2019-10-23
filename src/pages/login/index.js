import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './style.css';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios({
          method: 'post',
          url: 'http://localhost:8080/user/login',
          data: {
            username: values.username,
            password: values.password
          }
        })
          .then(res => {
            if (res.data) {
              localStorage.setItem(
                'user',
                JSON.stringify({
                  username: res.data.user.username,
                  password: res.data.user.password
                })
              );
              localStorage.setItem(
                'token',
                JSON.stringify({
                  token: res.data.token
                })
              );
              this.setState({
                islogin: true
              });
              console.log(this.state.islogin);
            } else {
              message.error('Tài khoản hoặc mật khẩu không chính xác');
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h2>Login</h2>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <Link className="login-form-forgot" to="/">
              Forgot password
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or
            <Link to="/register"> register now!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(
  NormalLoginForm
);
export default WrappedNormalLoginForm;
