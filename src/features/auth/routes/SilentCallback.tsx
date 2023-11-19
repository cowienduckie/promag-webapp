import React, { useEffect } from 'react';

import Authentication from '@/libs/authentication';
import Logger from '@/utils/logger';

export const SilentCallback = () => {
  useEffect(() => {
    const signinRedirectCallback = async () => {
      try {
        await Authentication.UserManager.signinSilentCallback();

        Logger.info('Successful token silent callback');
      } catch (error) {
        Logger.error(`There was an error while handling the token callback: ${error}`);
      }
    };

    signinRedirectCallback();
    // eslint-disable-next-line
  }, []);

  return <div>Authentication callback ...</div>;
};
