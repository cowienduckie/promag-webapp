import { graphqlRequest } from '@/libs/axios';

import { RegisterUserInput } from '../types';

export type RegisterResponse = {
  userId?: string;
};

export const registerWithEmail = (data: RegisterUserInput): Promise<RegisterResponse> => {
  const operationName = 'RegisterUser';
  const mutation = `
    mutation ${operationName}($input: RegisterUserInput) {
      registerUser(registerUserInput: $input) {
          userId
      }
  }`;

  return graphqlRequest<RegisterResponse>(operationName, mutation, {
    input: {
      ...data
    }
  });
};
