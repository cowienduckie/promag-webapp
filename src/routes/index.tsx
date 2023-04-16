import { useRoutes } from 'react-router-dom';

import { commonRoutes } from './common';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const element = useRoutes([...protectedRoutes, ...publicRoutes, ...commonRoutes]);

  return <>{element}</>;
};
