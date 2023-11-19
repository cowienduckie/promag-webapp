import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { publicRoutes } from '@/routes/public';

import { protectedRoutes } from './protected';

export const routes: Array<RouteObject> = [...protectedRoutes, ...publicRoutes];

export const AppRoutes = () => {
  const router = createBrowserRouter([...routes]);

  return router;
};
