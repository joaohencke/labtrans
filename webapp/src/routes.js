import Root from './_root';

import authRoutes from './modules/auth/routes';
import bookingRoutes from './modules/booking/routes';

export default [
  {
    component: Root,
    routes: [...authRoutes, ...bookingRoutes],
  },
];
