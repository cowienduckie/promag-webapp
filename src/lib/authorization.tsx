import * as React from 'react';

import { useUser } from './auth';

export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
  'scheme:policy': (user: any) => {
    if (user.role === 'ADMIN') {
      return true;
    }

    return user.role === 'USER';
  }
};

export const useAuthorization = () => {
  const user = useUser();

  if (!user.data) {
    throw Error('Not logged in!');
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        if (!user.data) {
          return false;
        }

        return allowedRoles?.includes(user.data.role);
      }

      return true;
    },
    [user.data]
  );

  return { checkAccess, role: user.data.role };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
