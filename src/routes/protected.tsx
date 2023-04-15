import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// TODO: Lazy import main components of features

const App = () => {
  // TODO: put main layout below
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [{ path: '*', element: <Navigate to="." /> }] // TODO: Add routes here
  }
];
