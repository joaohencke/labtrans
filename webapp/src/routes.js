import Root from './_root';

import authRoutes from './modules/auth/routes';

export default [
  {
    component: Root,
    routes: authRoutes,
  },
];
