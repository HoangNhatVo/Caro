import React from 'react';
import { Layout, Form, Button, Input, message } from 'antd';
import Avatar from 'react-avatar-edit';
import axios from 'axios';
import Header from '../partial/header/index';
import './style.css';

const { Content } = Layout;
class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      _id: '',
      preview: null,
      src: ''
    };
  }

  onCrop = preview => {
    this.setState({ preview });
  };

  componentWillMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    const isggfb = JSON.parse(localStorage.getItem('isggfb'));
    console.log(isggfb);
    if (isggfb) {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user);
      this.setState({
        username: user.username,
        preview: user.img
      });
    } else {
      axios
        .get('https://expresapi.herokuapp.com/me', {
          headers: { Authorization: `Bearer ${token.token}` }
        })
        .then(res => {
          console.log(res);
          this.setState({
            username: res.data.username,
            password: res.data.password,
            _id: res.data._id,
            preview: res.data.avatar
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  onClose = () => {
    this.setState({ preview: null });
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'));
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios({
          method: 'post',
          url: 'https://expresapi.herokuapp.com/me/information',
          headers: { Authorization: `Bearer ${token.token}` },
          data: {
            username: values.username,
            password: values.password,
            _id: this.state._id,
            avatar: this.state.preview
          }
        })
          .then(() => {
            message.success('Thay đổi thông tin thành công');
            window.parent.location = window.parent.location.href;
          })
          .catch(error => {
            message.error('Thay đổi thông tin thất bại');
            console.log(error);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const isggfb = JSON.parse(localStorage.getItem('isggfb'));
    return (
      <Layout className="layout">
        <Header />
        <Content
          style={{
            padding: '0 50px',
            textAlign: 'center',
            backgroundColor: '#fff',
            minHeight: 300,
            position: 'relative'
          }}
        >
          <div style={{ marginTop: 100, display: 'flex' }}>
            <Avatar
              width={200}
              height={200}
              onCrop={this.onCrop}
              onClose={this.onClose}
              src={this.state.src}
            />
            <img
              src={this.state.preview}
              alt="Avatar"
              style={{
                marginLeft: 75,
                border: '1px dashed #000',
                borderRadius: 5,
                width: 195
              }}
            />
          </div>
          <Form className="info-form">
            <h2>Thông tin cá nhân</h2>
            <Form.Item>
              {getFieldDecorator('username', {
                initialValue: this.state.username,
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                initialValue: this.state.password,
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(<Input.Password />)}
            </Form.Item>
            {isggfb ? (
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: '30%' }}
                disabled
              >
                Lưu
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.handleSubmit}
                style={{ width: '30%' }}
              >
                Lưu
              </Button>
            )}
          </Form>
        </Content>
      </Layout>
    );
  }
}
const WrappedNormalForm = Form.create({ name: 'information_form' })(
  Information
);
export default WrappedNormalForm;
