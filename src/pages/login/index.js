import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import queryString from 'query-string';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false
    };
  }

  componentWillMount() {
    const query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem(
        'token',
        JSON.stringify({
          token: query.token
        })
      );
      this.props.history.push('/home');
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios({
          method: 'post',
          url: 'https://expresapi.herokuapp.com/user/login',
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
              message.success('Đăng nhập thành công');
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
        <Form className="login-form">
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
              onClick={this.handleSubmit}
            >
              Log in
            </Button>
            <a
              href="https://expresapi.herokuapp.com/user/google"
              className="button"
              style={{ backgroundColor: 'white' }}
            >
              <div>
                <span className="svgIcon t-popup-svg">
                  <svg
                    className="svgIcon-use"
                    width="25"
                    height="37"
                    viewBox="0 0 25 25"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path
                        d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                        fill="#34A853"
                      />
                      <path
                        d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                        fill="#EA4335"
                      />
                    </g>
                  </svg>
                </span>
                <span className="button-label">Sign in with Google</span>
              </div>
            </a>
            <p style={{ textAlign: 'center', fontSize: 18, marginTop: 10 }}>
              Or
              <Link to="/register"> register now!</Link>
            </p>
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
