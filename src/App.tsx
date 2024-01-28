import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { RouterProvider } from 'react-router-dom';

import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';

function App() {
  return (
    <>
      <AppProvider>
        <RouterProvider router={AppRoutes()} />
      </AppProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
