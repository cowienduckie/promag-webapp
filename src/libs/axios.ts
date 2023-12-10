import Axios, { InternalAxiosRequestConfig } from 'axios';

import Authentication from '@/libs/authentication';
import { IError } from '@/types/error';

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
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const graphqlRequest = async <T>(
  operationName: string,
  query: string,
  variables?: object
): Promise<T> => {
  const { data: responseData } = await axios.post('/graphql', {
    operationName,
    query,
    variables
  });

  const { data, errors } = responseData;

  if (!data[operationName] || errors) {
    const error: IError = {
      status: '500',
      statusText: 'Internal Server Error',
      message: errors?.[0]?.message ?? 'An error occurred'
    };

    throw error;
  }

  if (data[operationName].statusCode && data[operationName].statusCode !== 200) {
    const error: IError = {
      status: data[operationName].statusCode,
      statusText: data[operationName].errorCode,
      message: data[operationName].errorMessage
    };

    throw error;
  }

  return data[operationName] as T;
};
