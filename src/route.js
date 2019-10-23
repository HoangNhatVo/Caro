import React from 'react';
import Login from './pages/login/index';
import Register from './pages/register/index';
import HomePage from './pages/home/index';

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
  }
];

export default route;
