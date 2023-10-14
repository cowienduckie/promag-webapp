import { Analytics } from '@vercel/analytics/react';

import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';

function App() {
  return (
    <>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
      <Analytics />
    </>
  );
}

export default App;
