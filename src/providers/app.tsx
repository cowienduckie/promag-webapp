import { StyleProvider } from '@ant-design/cssinjs';
import { App as AntdApp, Button } from 'antd';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { FullScreenLoading } from '@/components/Loading';
import { AppContextProvider } from '@/contexts/app-context';

const ErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Oops, something went wrong :( </h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<FullScreenLoading />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <StyleProvider hashPriority="high">
            <AntdApp>
              <AppContextProvider>{children}</AppContextProvider>
            </AntdApp>
          </StyleProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
