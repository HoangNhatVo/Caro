import React from 'react';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom';
import Game from '../../Game';
import Header from '../partial/header/index';
import './style.css';

const { Content } = Layout;
class Homepage extends React.Component {
  render() {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token.token);
    if (!token) {
      return <Redirect to="/" />;
    }
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
