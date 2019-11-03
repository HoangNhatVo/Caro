import React from 'react';
import Login from './pages/login/index';
import Register from './pages/register/index';
import HomePage from './pages/home/index';
import Game from './Game';
import Information from './pages/information/index';

const route = [
  {
    path: '/',
    exact: true,
    main: ({ location, history }) => (
      <Login location={location} history={history} />
    )
  },
  {
    path: '/register',
    exact: true,
    main: () => <Register />
  },
  {
    path: '/home',
    exact: true,
    main: () => <HomePage />
  },
  {
    path: '/game',
    exact: true,
    main: () => <Game />
  },
  {
    path: '/information',
    exact: true,
    main: () => <Information />
  }
];

export default route;
