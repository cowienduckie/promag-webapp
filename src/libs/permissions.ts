import { jwtDecode, JwtPayload } from 'jwt-decode';
import React, { useContext } from 'react';

import { AppContext } from '@/contexts/app-context';

const PERMISSIONS = {
  PROFILE_FULL: '0.f',
  PROFILE_VIEW: '0.v',
  //MANAGE_USER = 1
  USER_FULL: '1.f',
  USER_VIEW: '1.v',
  USER_CREATE: '1.c',
  USER_DELETE: '1.d',
  // MANEGE_PERSON = 2
  PERSON_FULL: '2.f',
  PERSON_VIEW: '2.v',
  PERSON_CREATE: '2.c',
  PERSON_DELETE: '2.d',
  // MANEGE_CONTACT = 3
  CONTACT_FULL: '3.f',
  CONTACT_VIEW: '3.v',
  CONTACT_CREATE: '3.c',
  CONTACT_DELETE: '3.d',
  // MANEGE_ROLE = 4
  ROLE_FULL: '4.f',
  ROLE_VIEW: '4.v',
  ROLE_CREATE: '4.c',
  ROLE_DELETE: '4.d'
};

enum Policies {
  USER,
  USER_VIEW,
  USER_CREATE,
  USER_DELETE,

  PERSON,
  PERSON_VIEW,
  PERSON_CREATE,
  PERSON_DELETE,

  CONTACT,
  CONTACT_VIEW,
  CONTACT_CREATE,
  CONTACT_DELETE,

  ROLE,
  ROLE_VIEW,
  ROLE_CREATE,
  ROLE_DELETE,

  ME,
  NOT_CHECK
}

const usePermissions = () => {
  const { access_token } = useContext(AppContext);

  const [listPermissions, setListPermissions] = React.useState({
    permissions: {
      PROFILE_FULL: false,
      PROFILE_VIEW: false,
      USER_FULL: false,
      USER_VIEW: false,
      USER_CREATE: false,
      USER_DELETE: false,
      PERSON_FULL: false,
      PERSON_VIEW: false,
      PERSON_CREATE: false,
      PERSON_DELETE: false,
      CONTACT_FULL: false,
      CONTACT_VIEW: false,
      CONTACT_CREATE: false,
      CONTACT_DELETE: false,
      ROLE_FULL: false,
      ROLE_VIEW: false,
      ROLE_CREATE: false,
      ROLE_DELETE: false
    },
    loading: true
  });

  type CustomJwtPayload = JwtPayload & {
    permission?: Array<string>;
  };

  const getPermissions = async (access_token: string) => {
    try {
      const permission = jwtDecode<CustomJwtPayload>(access_token).permission;

      if (permission) {
        setListPermissions({
          permissions: {
            PROFILE_FULL: permission.includes(PERMISSIONS.PROFILE_FULL),
            PROFILE_VIEW: permission.includes(PERMISSIONS.PROFILE_VIEW),
            USER_FULL: permission.includes(PERMISSIONS.USER_FULL),
            USER_VIEW: permission.includes(PERMISSIONS.USER_VIEW),
            USER_CREATE: permission.includes(PERMISSIONS.USER_CREATE),
            USER_DELETE: permission.includes(PERMISSIONS.USER_DELETE),
            PERSON_FULL: permission.includes(PERMISSIONS.PERSON_FULL),
            PERSON_VIEW: permission.includes(PERMISSIONS.PERSON_VIEW),
            PERSON_CREATE: permission.includes(PERMISSIONS.PERSON_CREATE),
            PERSON_DELETE: permission.includes(PERMISSIONS.PERSON_DELETE),
            CONTACT_FULL: permission.includes(PERMISSIONS.CONTACT_FULL),
            CONTACT_VIEW: permission.includes(PERMISSIONS.CONTACT_VIEW),
            CONTACT_CREATE: permission.includes(PERMISSIONS.CONTACT_CREATE),
            CONTACT_DELETE: permission.includes(PERMISSIONS.CONTACT_DELETE),
            ROLE_FULL: permission.includes(PERMISSIONS.ROLE_FULL),
            ROLE_VIEW: permission.includes(PERMISSIONS.ROLE_VIEW),
            ROLE_CREATE: permission.includes(PERMISSIONS.ROLE_CREATE),
            ROLE_DELETE: permission.includes(PERMISSIONS.ROLE_DELETE)
          },
          loading: false
        });
      } else {
        setListPermissions({
          permissions: listPermissions.permissions,
          loading: false
        });
      }
    } catch (error) {
      setListPermissions({
        permissions: listPermissions.permissions,
        loading: false
      });
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (access_token) {
      getPermissions(access_token);
    }
    // eslint-disable-next-line
  }, [access_token]);

  return listPermissions;
};

export { Policies, PERMISSIONS, usePermissions };
