import Axios, { InternalAxiosRequestConfig } from 'axios';

import { WEB_APIGW_URL } from '@/config/environments';
import Authentication from '@/lib/authentication';
import { useNotificationStore } from '@/stores/notifications';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = Authentication.getAccessToken();

  config.headers.authorization = token ? `Bearer ${token}` : '';
  config.headers.Accept = 'application/json';

  return config;
}

export const axios = Axios.create({
  baseURL: WEB_APIGW_URL
});

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
