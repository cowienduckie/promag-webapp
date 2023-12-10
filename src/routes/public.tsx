import { RouteObject } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';

const { FullScreenError } = lazyImport(() => import('@/components/Error'), 'FullScreenError');
const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');
const { Register } = lazyImport(() => import('@/features/misc/routes'), 'Register');
const { Landing } = lazyImport(() => import('@/features/misc/routes'), 'Landing');
const { Unauthorized } = lazyImport(() => import('@/components/Results'), 'Unauthorized');
const { NotFound } = lazyImport(() => import('@/components/Results'), 'NotFound');
const { InternalServerError } = lazyImport(
  () => import('@/components/Results'),
  'InternalServerError'
);

export const publicRoutes: Array<RouteObject> = [
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <FullScreenError />
  },
  {
    path: '/auth/*',
    element: <AuthRoutes />,
    errorElement: <FullScreenError />
  },
  {
    path: '/401',
    element: <Unauthorized />
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '/500',
    element: <InternalServerError />
  }
];
