import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';
import { Suspense } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';

import { Head } from '@/components/Head';
import { MainLayout } from '@/components/Layout';
import { FullScreenLoading } from '@/components/Loading'; // TODO: Lazy import main components of features
import { AuthLoader } from '@/lib/auth';

// TODO: Lazy import main components of features
// import { lazyImport } from '@/utils/lazyImport';
// const { DiscussionsRoutes } = lazyImport(
//     () => import('@/features/discussions'),
//     'DiscussionsRoutes'
// );
// const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
// const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');
// const { Users } = lazyImport(() => import('@/features/users'), 'Users');

const Unauthenticated = () => (
  <>
    <Head title={'Unauthenticated'} description={'Unauthenticated'} />
    <div className={clsx('m-auto flex min-h-screen flex-col items-center justify-center')}>
      <h1 className={clsx('m-auto flex min-h-screen flex-col items-center justify-center')}>
        <span className={clsx('my-2 text-3xl')}>Unauthenticated!</span>
        <Link to="/auth/login">
          <Button className={clsx('my-4')} type="primary" size="large">
            Go to Login <SendOutlined className={clsx('align-baseline')} />
          </Button>
        </Link>
      </h1>
    </div>
  </>
);

const App = () => {
  return (
    <AuthLoader renderLoading={() => <FullScreenLoading />} renderUnauthenticated={Unauthenticated}>
      <MainLayout>
        <Suspense fallback={<FullScreenLoading />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    </AuthLoader>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [{ path: '*', element: <Navigate to="." /> }] // TODO: Add routes here
  }
];
