import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Head } from '@/components/Head';

const welcomeText = 'Welcome to ProMag App';

export const Landing = () => {
  return (
    <>
      <Head title={welcomeText} description={welcomeText} />
      <div className={clsx('m-auto flex min-h-screen flex-col items-center justify-center')}>
        <h1 className={clsx('m-auto flex min-h-screen flex-col items-center justify-center')}>
          {welcomeText}
        </h1>
        <Link to="/app">
          <Button type="primary" size="large">
            Get Started <SendOutlined className={clsx('align-baseline')} />
          </Button>
        </Link>
      </div>
    </>
  );
};
