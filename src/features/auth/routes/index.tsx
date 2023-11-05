import { Route, Routes } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';

const { Callback } = lazyImport(() => import('./Callback'), 'Callback');
const { SilentCallback } = lazyImport(() => import('./SilentCallback'), 'SilentCallback');
const { NotAuthenticated } = lazyImport(() => import('./NotAuthenticated'), 'NotAuthenticated');

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="callback" element={<Callback />} />
      <Route path="silent-callback" element={<SilentCallback />} />
      <Route path="401" element={<NotAuthenticated />} />
    </Routes>
  );
};
