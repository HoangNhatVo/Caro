import React from 'react';
import { Layout, Menu, Dropdown, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const { Header, Content, Footer } = Layout;
class Homepage extends React.Component {
  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Icon type="user" />
          Thông tin cá nhân
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/">
            <span onClick={this.logout}>
              <Icon type="user" />
              Đăng xuất
            </span>
          </Link>
        </Menu.Item>
      </Menu>
    );

    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);

    if (token) {
      const config = {
        headers: { Authorization: `bearer ${token.token}` }
      };
      const bodyParameters = {
        key: 'value'
      };
      axios
        .get('http://localhost:8080/me', bodyParameters, config)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }

    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <div id="components-dropdown-demo-dropdown-button">
            <Dropdown.Button overlay={menu} icon={<Icon type="user" />}>
              Username
            </Dropdown.Button>
          </div>
        </Header>
        <Content
          style={{
            padding: '0 50px',
            textAlign: 'center',
            backgroundColor: '#fff',
            minHeight: 300,
            position: 'relative'
          }}
        >
          <Button
            type="primary"
            icon="play-circle"
            style={{
              fontSize: 20,
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              margin: 'auto'
            }}
          >
            Play game
          </Button>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            position: 'absolute',
            bottom: 0,
            width: '100%'
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default Homepage;
