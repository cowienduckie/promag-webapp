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
      <div
        style={{
          minHeight: '100vh',
          backgroundImage: `url('./landing-bg.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div
        className={clsx(
          'absolute left-1/2 top-1/2 flex min-h-fit min-w-fit -translate-x-1/2 -translate-y-1/2 flex-col bg-black bg-opacity-40 p-10 text-center text-white'
        )}
      >
        <span className={clsx('my-2 text-3xl')}>WELCOME TO PROMAG APP!</span>
        <Link to={authenticated ? '/app' : '/register'}>
          <Button className={clsx('my-4')} type="primary" size="large">
            Get Started <SendOutlined className={clsx('align-baseline')} />
          </Button>
        </Link>
        <span>
          or{' '}
          <Link to="/app" className={clsx('cursor-pointer text-white underline')}>
            Login into your account
          </Link>
        </span>
      </div>
    </>
  );
};
