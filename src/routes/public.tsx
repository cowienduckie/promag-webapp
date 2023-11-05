import { RouteObject } from 'react-router-dom';

import { Landing } from '@/features/misc';
import { lazyImport } from '@/utils/lazyImport';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

export const publicRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/auth/*',
    element: <AuthRoutes />
  }
];
