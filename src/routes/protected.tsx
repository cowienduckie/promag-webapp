import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import { AuthLayout } from '@/components/Layout';

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
    children: [{ path: '*', element: <Navigate to="." /> }]
  }
];
