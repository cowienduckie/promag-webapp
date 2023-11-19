import { Outlet, RouteObject } from 'react-router-dom';

import { FullScreenError } from '@/components/Error';
import { AuthLayout } from '@/components/Layout';
import { ProjectRoutes } from '@/features/projects';

const App = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export const protectedRoutes: Array<RouteObject> = [
  {
    path: '/app',
    element: <App />,
    errorElement: <FullScreenError />,
    children: [{ ...ProjectRoutes }]
  }
];
