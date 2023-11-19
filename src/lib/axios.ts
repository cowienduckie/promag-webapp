import Axios, { InternalAxiosRequestConfig } from 'axios';

import Authentication from '@/lib/authentication';
import { useNotificationStore } from '@/stores/notifications';

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = await Authentication.getAccessToken();

  config.headers.authorization = token ? `Bearer ${token}` : '';
  config.headers.Accept = 'application/json';

  return config;
}

export const axios = Axios.create();

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message
    });

    return Promise.reject(error);
  }
);

export const graphqlRequest = async <T>(
  operationName: string,
  query: string,
  variables?: object
): Promise<T> => {
  const response = await axios.post('/graphql', {
    operationName,
    query,
    variables
  });

  return response.data[operationName] as T;
};
