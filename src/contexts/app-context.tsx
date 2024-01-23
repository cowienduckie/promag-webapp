import { User } from 'oidc-client-ts';
import React, { Reducer, useCallback, useEffect, useMemo, useReducer } from 'react';

import { LOAD_LOGINUSER, UNLOAD_LOGINUSER, UPDATE_TOKEN } from '@/config/app-context-events';
import Authentication from '@/libs/authentication';
import { AppState, AuthorizeInfo, LoginUser } from '@/types/app-interfaces';
import { IContextProviderProps } from '@/types/context-provider';
import Logger from '@/utils/logger';

const initialState: AppState = {
  userLogin: null,
  authenticated: false,
  access_token: null,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateToken(id: string) {
    throw new Error('AppContext not yet initialized.');
  }
};

const AppContext = React.createContext<AppState>(initialState);

AppContext.displayName = 'ApplicationContext';

type Action =
  | {
      type: typeof LOAD_LOGINUSER;
      payload: LoginUser;
    }
  | {
      type: typeof UNLOAD_LOGINUSER;
    }
  | {
      type: typeof UPDATE_TOKEN;
      payload: AuthorizeInfo;
    };

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case LOAD_LOGINUSER:
      return {
        ...state,
        userLogin: action.payload,
        authenticated: true
      };
    case UNLOAD_LOGINUSER:
      return {
        ...state,
        userLogin: null,
        authenticated: false
      };
    case UPDATE_TOKEN:
      return {
        ...state,
        access_token: action.payload.access_token
      };
    default:
      return state;
  }
};

const AppContextProvider = (props: IContextProviderProps) => {
  const [state, dispatch] = useReducer<Reducer<AppState, Action>>(reducer, initialState);

  // Handle context states
  const onUserLoaded = () => (user: User) => {
    Logger.info('User Loaded');

    dispatch({
      type: LOAD_LOGINUSER,
      payload: {
        userName: user.profile.preferred_username as string,
        email: user.profile.email as string
      }
    });
  };

  const updateToken = useCallback((access_token: string) => {
    dispatch({
      type: UPDATE_TOKEN,
      payload: {
        access_token: access_token
      }
    });
  }, []);

  const value: AppState = useMemo(
    () => ({
      ...state,
      updateToken
    }),
    [state, updateToken]
  );

  // Handle OIDC events
  const onAccessTokenExpired = () => async () => {
    Logger.info('Token expired.');

    dispatch({
      type: 'UNLOAD_LOGINUSER'
    });

    await Authentication.UserManager.signinSilent();
  };

  const addOidcEvents = useCallback(() => {
    const oidcEvents = Authentication.UserManager.events;
    oidcEvents.addUserLoaded(onUserLoaded());
    oidcEvents.addAccessTokenExpired(onAccessTokenExpired());
  }, []);

  const removeOidcEvents = useCallback(() => {
    const oidcEvents = Authentication.UserManager.events;
    oidcEvents.removeUserLoaded(onUserLoaded());
    oidcEvents.removeAccessTokenExpired(onAccessTokenExpired());
  }, []);

  useEffect(() => {
    addOidcEvents();
    Authentication.UserManager.getUser().then((oidcUser) => {
      if (oidcUser && !oidcUser?.expired) {
        dispatch({
          type: LOAD_LOGINUSER,
          payload: {
            userName: oidcUser.profile.preferred_username as string,
            email: oidcUser.profile.email as string
          }
        });
      }
    });
    return () => removeOidcEvents();
  }, [addOidcEvents, removeOidcEvents]);

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
