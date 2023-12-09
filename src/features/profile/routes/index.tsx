import { MeLoader, MePage } from './me';

export const ProfileRoutes = {
  path: 'profile',
  children: [
    {
      path: 'me',
      element: <MePage />,
      loader: MeLoader
    }
  ]
};
