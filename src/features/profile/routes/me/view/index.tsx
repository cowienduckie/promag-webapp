import { Typography } from 'antd';
import { useLoaderData } from 'react-router-dom';

import { LoaderData } from '../interfaces';

export const MePage = () => {
  const { myProfile } = useLoaderData() as LoaderData;

  return (
    <div>
      <Typography.Text>
        Hello {myProfile.firstName} {myProfile.lastName}!
      </Typography.Text>
    </div>
  );
};
