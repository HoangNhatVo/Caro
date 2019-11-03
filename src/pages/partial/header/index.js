import React from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Header } = Layout;
class HeaderGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      preview: null
    };
  }

  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  componentWillMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    axios
      .get('https://expresapi.herokuapp.com/me', {
        headers: { Authorization: `Bearer ${token.token}` }
      })
      .then(res => {
        this.setState({
          username: res.data.username,
          preview: res.data.avatar
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Link to="/information">
            <Icon type="user" />
            Thông tin cá nhân
          </Link>
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
    return (
      <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="logo">
          <Link to="/home">
            <Icon type="home" style={{ color: '#fff', fontSize: 24 }} />
          </Link>
        </div>
        <div id="components-dropdown-demo-dropdown-button">
          <Dropdown.Button
            overlay={menu}
            icon={
              this.state.preview ? (
                <img
                  src={this.state.preview}
                  alt="Avatar"
                  style={{ width: 25, height: 25 }}
                />
              ) : (
                <Icon type="user" />
              )
            }
          >
            {this.state.username}
          </Dropdown.Button>
        </div>
      </Header>
    );
  }
}

export default HeaderGame;
