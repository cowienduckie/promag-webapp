import { RouteObject } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');
const { Register } = lazyImport(() => import('@/features/misc/routes'), 'Register');
const { Landing } = lazyImport(() => import('@/features/misc/routes'), 'Landing');

export const publicRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/auth/*',
    element: <AuthRoutes />
  }
];
