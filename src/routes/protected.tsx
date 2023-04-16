import { Link, Navigate, Outlet } from 'react-router-dom';

import { AuthLoader } from '@/lib/auth';

// TODO: Lazy import main components of features

const App = () => {
  // TODO: put main layout below
  return (
    <AuthLoader
      renderLoading={() => <div>Loading ...</div>}
      renderUnauthenticated={() => (
        <div>
          Unauthenticated! <Link to="/auth/login">Go to Login page</Link>
        </div>
      )}
    >
      <Outlet />
    </AuthLoader>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [{ path: '*', element: <Navigate to="." /> }] // TODO: Add routes here
  }
];
