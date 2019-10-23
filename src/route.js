import React from 'react';
import Login from './pages/login/index';
import Register from './pages/register/index';
import HomePage from './pages/home/index';
import Game from './Game';

const route = [
  {
    path: '/',
    exact: true,
    main: () => <Login />
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
  }
];

export default route;
