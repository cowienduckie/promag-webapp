import { Outlet, RouteObject, useLocation } from 'react-router-dom';

import { FullScreenError } from '@/components/Error';
import { AuthLayout } from '@/components/Layout';
import { Dashboard } from '@/features/misc';
import { ProfileRoutes } from '@/features/profile';
import { ProjectRoutes } from '@/features/projects';
import { WorkspaceRoutes } from '@/features/workspaces';

const App = () => {
  const location = useLocation();

  return (
    <AuthLayout>
      {location.pathname === '/app' && <Dashboard />}
      <Outlet />
    </AuthLayout>
  );
};

export const protectedRoutes: Array<RouteObject> = [
  {
    path: '/app',
    element: <App />,
    errorElement: <FullScreenError />,
    children: [{ ...ProjectRoutes }, { ...ProfileRoutes }, { ...WorkspaceRoutes }]
  }
];
