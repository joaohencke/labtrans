import Login from './containers/Login';

export default [
  {
    path: '/login',
    exact: true,
    component: Login,
    name: 'auth-login',
  },
];
