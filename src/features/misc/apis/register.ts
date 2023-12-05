import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { graphqlRequest } from '@/libs/axios';
import { MutationConfig } from '@/libs/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { RegisterUserInput } from '../types';

export type RegisterResponse = {
  userId?: string;
};

type MutationFnType = typeof registerWithEmailFn;

type UseRegisterWithEmailOptions = {
  config?: MutationConfig<MutationFnType>;
};

export const registerWithEmailFn = (data: RegisterUserInput): Promise<RegisterResponse> => {
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

export const useRegisterWithEmail = ({ config }: UseRegisterWithEmailOptions = {}) => {
  const { addNotification } = useNotificationStore();
  const navigate = useNavigate();

  return useMutation({
    onMutate: () => {},
    onError: () => {
      addNotification({
        type: 'error',
        title: 'There was an error registering'
      });
    },
    onSuccess: (data: RegisterResponse) => {
      addNotification({
        type: 'success',
        title: `${data.userId} has registered successfully! Please check the email to verify your account.`
      });
      navigate('/app');
    },
    ...config,
    mutationFn: registerWithEmailFn
  });
};
