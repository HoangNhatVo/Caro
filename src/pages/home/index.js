import React from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Game from '../../Game';
import './style.css';

const { Header, Content } = Layout;
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
    const username = JSON.parse(localStorage.getItem('user'));
    console.log(username);
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <div id="components-dropdown-demo-dropdown-button">
            <Dropdown.Button overlay={menu} icon={<Icon type="user" />}>
              {username.username}
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
          <Game />
          {/* <Link to='/game'>
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
          </Link> */}
        </Content>
      </Layout>
    );
  }
}

export default Homepage;
