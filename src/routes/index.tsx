import { RouteObject, useRoutes } from 'react-router-dom';

import { publicRoutes } from '@/routes/public';

import { protectedRoutes } from './protected';

export const routes: Array<RouteObject> = [...protectedRoutes, ...publicRoutes];

export const AppRoutes = () => {
  const element = useRoutes([...routes]);

  return <>{element}</>;
};
