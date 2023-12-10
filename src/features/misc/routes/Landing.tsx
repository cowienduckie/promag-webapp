import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Head } from '@/components/Head';
import { AppContext } from '@/contexts/app-context';

export const Landing = () => {
  const { authenticated } = useContext(AppContext);

  return (
    <>
      <Head title={'Welcome'} description={'WELCOME TO PROMAG APP!'} />
      <div className={clsx('m-auto flex min-h-screen flex-col items-center justify-center')}>
        <h1 className={clsx('m-auto flex min-h-screen flex-col items-center justify-center')}>
          <span className={clsx('my-2 text-3xl')}>WELCOME TO PROMAG APP!</span>
          <Link to={authenticated ? '/app' : '/register'}>
            <Button className={clsx('my-4')} type="primary" size="large">
              Get Started <SendOutlined className={clsx('align-baseline')} />
            </Button>
          </Link>
          <span>
            or{' '}
            <Link to="/app" className={clsx('cursor-pointer underline')}>
              Login into your account
            </Link>
          </span>
        </h1>
      </div>
    </>
  );
};
