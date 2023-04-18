import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { UserResponse } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post('/auth/login', data);
};

type MutationFnType = typeof loginWithEmailAndPassword;

type UseLoginWithEmailAndPasswordOptions = {
  config?: MutationConfig<MutationFnType>;
};

export const useLoginWithEmailAndPassword = ({
  config
}: UseLoginWithEmailAndPasswordOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: () => {},
    onError: () => {
      addNotification({
        type: 'error',
        title: 'There was an error logging in'
      });
    },
    onSuccess: (data: UserResponse) => {
      queryClient.refetchQueries(['getUser']);
      addNotification({
        type: 'success',
        title: `${data.user.email} has logged in successfully!`
      });
    },
    ...config,
    mutationFn: loginWithEmailAndPassword
  });
};
