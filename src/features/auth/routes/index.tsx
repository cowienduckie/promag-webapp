import { Route, Routes } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';

const { Callback } = lazyImport(() => import('./Callback'), 'Callback');
const { SilentCallback } = lazyImport(() => import('./SilentCallback'), 'SilentCallback');

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="callback" element={<Callback />} />
      <Route path="silent_callback" element={<SilentCallback />} />
    </Routes>
  );
};
