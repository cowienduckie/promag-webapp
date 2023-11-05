import { ReactNode, Suspense } from 'react';

import { FullScreenLoading } from '@/components/Loading';

export const NonAuthLayout = (children: ReactNode) => {
  return <Suspense fallback={<FullScreenLoading />}>{children}</Suspense>;
};
