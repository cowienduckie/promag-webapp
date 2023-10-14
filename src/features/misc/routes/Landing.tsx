import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Head } from '@/components/Head';

const welcomeText = 'WELCOME TO PROMAG APP!';

export const Landing = () => {
  return (
    <>
      <Head title={welcomeText} description={welcomeText} />
      <div className={clsx('m-auto flex min-h-screen flex-col items-center justify-center')}>
        <h1 className={clsx('m-auto flex min-h-screen flex-col items-center justify-center')}>
          <span className={clsx('my-2 text-3xl')}>{welcomeText}</span>
          <Link to="/app">
            <Button className={clsx('my-4')} type="primary" size="large">
              Get Started <SendOutlined className={clsx('align-baseline')} />
            </Button>
          </Link>
        </h1>
      </div>
    </>
  );
};
