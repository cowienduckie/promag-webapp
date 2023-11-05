import { UserManagerSettings } from 'oidc-client-ts';

const portalUrl = window.location.origin;

export const OidcConfig: UserManagerSettings = {
  client_id: 'Promag-SPA',
  redirect_uri: `${portalUrl}/auth/callback`,
  authority: '/authority',
  response_type: 'code',
  post_logout_redirect_uri: `${portalUrl}`,
  scope: 'openid graphql-gateway personal-data portal communication master-data',
  silent_redirect_uri: `${portalUrl}/auth/silent_callback`,
  automaticSilentRenew: true,
  loadUserInfo: true
};
