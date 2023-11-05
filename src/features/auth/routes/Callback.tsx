import { User } from 'oidc-client-ts';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FullScreenLoading } from '@/components/Loading';
import Authentication from '@/lib/authentication';
import Logger from '@/utils/logger';

interface state {
  url: string;
}

export const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signinRedirectCallback = async () => {
      try {
        const user: User = await Authentication.UserManager.signinRedirectCallback();

        Logger.info('Successful token callback');

        navigate((user.state as state).url);
      } catch (error) {
        Logger.error(`There was an error while handling the token callback: ${error}`);
        navigate('/auth/401');
      }
    };

    signinRedirectCallback();
    // eslint-disable-next-line
  }, []);

  return <FullScreenLoading />;
};
