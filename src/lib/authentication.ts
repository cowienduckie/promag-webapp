import { UserManager } from 'oidc-client-ts';
import { Location } from 'react-router-dom';

import { OidcConfig } from '@/config/oidc-configs';
import Logger from '@/utils/logger';

class AuthenticationService {
  private readonly userManager: UserManager;

  constructor() {
    this.userManager = new UserManager(OidcConfig);
  }

  get UserManager(): UserManager {
    return this.userManager;
  }

  async getAccessToken(): Promise<string> {
    if (!this.userManager || !this.userManager.getUser) {
      return '';
    }

    const oidcUser = await this.userManager.getUser();

    return oidcUser?.access_token ?? '';
  }

  async authenticateUser(location: Location) {
    if (!this.userManager || !this.userManager.getUser) {
      return;
    }

    const oidcUser = await this.userManager.getUser();

    if (!oidcUser || oidcUser.expired) {
      Logger.debug('authenticating user ...');

      const url = location.pathname + (location.search || '');
      await this.userManager.signinRedirect({ url_state: url });
    }
  }

  async signOut() {
    if (!this.userManager || !this.userManager.getUser) {
      return;
    }

    const oidcUser = await this.userManager.getUser();
    if (oidcUser) {
      Logger.info('Logout user...');
      await this.userManager.signoutRedirect();
    }
  }
}

export default new AuthenticationService();
